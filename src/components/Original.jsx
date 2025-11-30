import React, { useState, useRef,useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
// import "./Original.css"; 

const PDFGenerator = ({ sharedData, setSharedData }) => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    // address: '',
    validityDate: '',
  });

  // Uploaded QR previews
  const [appQrPreview, setAppQrPreview] = useState('');
  const [uciQrPreview, setUciQrPreview] = useState('');
  // Generated barcode data URLs (fallback when no QR uploaded)
  const [barcodeDataUrl, setBarcodeDataUrl] = useState('');
  const [uciBarcodeDataUrl, setUciBarcodeDataUrl] = useState('');
  const pdfRef = useRef(null);

  // Consistent barcode sizing (tweak here only)
  const BARCODE_WIDTH_PX = 88;
  const BARCODE_HEIGHT_PX = 26;

  // Generate barcodes from inputs when they change (used if no QR uploaded)
 useEffect(() => {
    if (sharedData.applicationNo) {
      generateBarcode(sharedData.applicationNo, 'app');
    } else {
      setBarcodeDataUrl('');
    }
    if (sharedData.uci) {
      generateBarcode(sharedData.uci.replace(/-/g, ''), 'uci');
    } else {
      setUciBarcodeDataUrl('');
    }
  }, [sharedData.applicationNo, sharedData.uci]);

  const generateBarcode = (text, type) => {
    const canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, text, {
        format: 'CODE128',
        width: 1.2,
        height: BARCODE_HEIGHT_PX,
        displayValue: false,
        margin: 0,
      });
      const data = canvas.toDataURL();
      if (type === 'app') setBarcodeDataUrl(data);
      if (type === 'uci') setUciBarcodeDataUrl(data);
    } catch (err) {
      console.error('Error generating barcode', err);
    }
  };

  // 🔹 QR upload handlers (update sharedData)
  const handleAppQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSharedData(prev => ({ ...prev, appQrPreview: reader.result }));
    reader.readAsDataURL(file);
  };

 const handleUciQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSharedData(prev => ({ ...prev, uciQrPreview: reader.result }));
    reader.readAsDataURL(file);
  };

  const removeAppQr = () => setSharedData(prev => ({ ...prev, appQrPreview: '' }));
  const removeUciQr = () => setSharedData(prev => ({ ...prev, uciQrPreview: '' }));


const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'applicationNo') {
      const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (cleaned.length <= 10) {
        setSharedData(prev => ({ ...prev, applicationNo: cleaned }));
      }
      return;
    }

    if (name === 'uci') {
      const cleanValue = value.replace(/[^\d-]/g, '');
      if (cleanValue.length <= 12) {
        setSharedData(prev => ({ ...prev, uci: cleanValue }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const generatePDF = async () => {
    if (!formData.date) {
      alert('Please fill in date');
      return;
    }

    try {
      const element = pdfRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      // Use US Letter and scale image to fit entirely on a SINGLE page
      const pdf = new jsPDF('p', 'mm', 'letter');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Compute a scale that fits both width and height
      const pixelToMm = (px) => (px * 25.4) / 96; // html2canvas default 96 DPI
      const canvasWidthMm = pixelToMm(canvas.width);
      const canvasHeightMm = pixelToMm(canvas.height);
      const scale = Math.min(pageWidth / canvasWidthMm, pageHeight / canvasHeightMm);
      const imgWidth = canvasWidthMm * scale;
      const imgHeight = canvasHeightMm * scale;
      const x = (pageWidth - imgWidth) / 2;
      const y = 0; // top aligned

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

      pdf.save('Original Passport Request.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const formatDisplayDate = (isoDate) => {
    try {
      const parsed = new Date(isoDate);
      if (Number.isNaN(parsed.getTime())) return isoDate;
      return parsed.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return isoDate;
    }
  };

  const displayDate = formData.date ? formatDisplayDate(formData.date) : 'September 24, 2025';

  return (
    <div className="pdf-generator-container">
      <div className="generator-tab">
        <div className="form-container">
            <h1>Origianal passport</h1>
        <form className="generator-form">
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Application Number:</label>
             <input
              type="text"
              name="applicationNo"
              value={sharedData.applicationNo}
              onChange={handleInputChange}
              placeholder="e.g., V353364593"
              maxLength="10"
            />
            <div style={{ marginTop: '8px' }}>
              <label>Or upload Application QR (PNG/JPG): </label>
              <input type="file" accept="image/*" onChange={handleAppQrUpload} />
             {sharedData.appQrPreview && (
                <button type="button" onClick={removeAppQr} style={{ marginLeft: '8px' }}>Remove</button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>UCI:</label>
             <input
              type="text"
              name="uci"
              value={sharedData.uci}
              onChange={handleInputChange}
              placeholder="e.g., 11-2943-5159"
              maxLength="12"
            />
            <div style={{ marginTop: '8px' }}>
              <label>Or upload UCI QR (PNG/JPG): </label>
              <input type="file" accept="image/*" onChange={handleUciQrUpload} />
              {sharedData.uciQrPreview && (
                <button type="button" onClick={removeUciQr} style={{ marginLeft: '8px' }}>Remove</button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., DEEPAK SINGH"
            />
          </div>

          {/* <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="PEER COLONY, VILL SAID KHERI&#10;PATIALA 140401&#10;PUNJAB, INDIA"
              rows="4"
            />
          </div> */}

          <div className="form-group" style={{ display: 'none' }}>
            <label>Passport Validity Date (optional):</label>
            <input
              type="text"
              name="validityDate"
              value={formData.validityDate}
              onChange={handleInputChange}
              placeholder="e.g., 2033/11/07 (yyyy/mm/dd)"
            />
          </div>

          {/* QR upload removed as per requirement */}

          <button type="button" onClick={generatePDF} className="generate-btn">
            Generate Passport Request Letter PDF
          </button>
        </form>

      </div>

      <div className="preview-container">
        <h2>Preview</h2>
        <div
          ref={pdfRef}
          className="letter-preview"
          style={{ paddingLeft: '1in', paddingRight: '1in' }}
        >
          <div className="letter-header">
            <div className="canada-logo">
              <img 
                src="logo-gov.png" 
                alt="Symbol of the Government of Canada"
                className="official-logo"
                style={{marginBottom: "22px",width: "228px"}}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
             
            </div>
         
          </div>

          <div className="letter-content" style={{ paddingLeft: '48px', paddingTop: '60px' }}>
            <div className="date-section">
              <p>Date: {displayDate}</p>
            </div>

            <div className="reference-section">
              <div className="reference-numbers">
                <div className="uci-section">
                  <p>UCI: {sharedData.uci || '11-2943-5159'}</p>
                  {(sharedData.uciQrPreview || uciBarcodeDataUrl) && (
                    <div className="barcode-container-small" style={{ display: 'flex',alignItems: 'center', marginLeft: '42px' }}>
                      <img src={sharedData.uciQrPreview || uciBarcodeDataUrl} alt="UCI Code" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                      <img src={sharedData.uciQrPreview || uciBarcodeDataUrl} alt="UCI Code Duplicate" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                    </div>
                  )}
                </div>
                <div className="app-section">
                  <p style={{marginRight: '96px'}}>Application no.: {sharedData.applicationNo || 'V353364593'}</p>
                  {(sharedData.appQrPreview || barcodeDataUrl) && (
                    <div className="barcode-container-small" style={{ display: 'flex',  alignItems: 'center', justifyContent: 'flex-end', marginLeft: '10px' }}>
                      <img src={sharedData.appQrPreview || barcodeDataUrl} alt="Application Code" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                      <img src={sharedData.appQrPreview || barcodeDataUrl} alt="Application Code Duplicate" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                    </div>
                  )}
                </div>
              </div>
                <div className="reference-note">
                  <p style={{ 
                      color: "#ff0000",
                    }}><em>Please quote these reference numbers when referring to this application.</em></p>
                </div>
            </div>

            {/* <div className="recipient-address">
              {formData.address && (
                <div className="address-lines">
                  {formData.address.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div> */}

            <div className="greeting">
              <p>Dear {formData.name || 'DEEPAK SINGH'},</p>
            </div>

            <div className="letter-body">
              <p>
                This is in reference to your application for temporary residence. A decision has been made on your application. 
                We require your passport to finalize processing your application.
              </p>

              <h4 style={{ marginBottom: "2px" }}><strong>Passport requirements</strong></h4>
              <ul className="requirements-list" style={{ marginBottom: "2px" }}>
                <li style={{ marginBottom: "0px" }}>Please provide your passport or travel document, with a copy of this letter.</li>
                <li style={{ marginBottom: "0px" }}>There must be at least one blank page in your passport.</li>
                <li style={{ marginBottom: "0px" }}>Your passport must be valid for the duration of your expected length of stay in Canada.</li>
                <li className="italic-note" style={{ marginTop: "0px" }}>Please note that we cannot issue a visa beyond the expiry date on the passport.</li>
              </ul>

              <p>
                Your passport must be received by Immigration, Refugees and Citizenship Canada within 30 days from the date of this letter. 
                Failure to do so could result in the refusal of your application. Please ensure that a copy of this letter is included with your passport.
              </p>

              <div >
                <p><strong>Note:</strong> For <strong>super visa</strong> applications, passports must be submitted to a visa application centre outside Canada for insertion of a visitor visa.</p>
              </div>

              <div className="website-link" >
                <p style={{ fontSize: '13px'}}>To find out where to send your passport, visit our website:
                  <a  style={{color: "#0106ff",fontWeight: "500" }} href="https://www.canada.ca/content/canadasite/en/immigration-refugees-citizenship/services/application/account/where-submit-passport.html" className="document-link">https://www.canada.ca/content/canada
                  site/en/immigration-refugees-citizenship/services/application/account/where-submit-passport.html.</a>.</p>
              </div>

              <p>Thank you for the interest you have shown in Canada.</p>

              <div className="attention-section">
                <p><strong>Attention:</strong> The unique client identification (UCI) number in the upper left corner of this letter is your personal identification number. For your own protection, do not allow any person, other than an authorized representative, to use this number as it provides access to personal information on your file.</p>
              </div>

              <p>Immigration, Refugees and Citizenship Canada</p>

              <div className="dotted-separator" />

              <p>This message has been submitted to your account.</p>
              <p>By submitting your application electronically, you have agreed to receive correspondence</p>

            </div>

            
            {/* Footer Section */}
            <div className="document-footer">
              <div className="canada-wordmark">
                <div className="canada-logo-small">
                  <span className="canada-text">
                    <img src="wmms-spl.png" alt="Canada" className="official-logo2" style={{width: '122px'}} /></span>
                </div>
                <div className="document-reference">
                  <span>IMM 5740 (07-2023) E GCMS</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
