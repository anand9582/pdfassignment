import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import './PDFGenerator.css';

const Correspondence = ({ sharedData, setSharedData }) => {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
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
 React.useEffect(() => {
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

  // QR upload handlers
const handleAppQrUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () =>
    setSharedData((prev) => ({ ...prev, appQrPreview: reader.result }));
  reader.readAsDataURL(file);
};

const handleUciQrUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () =>
    setSharedData((prev) => ({ ...prev, uciQrPreview: reader.result }));
  reader.readAsDataURL(file);
};

const removeAppQr = () =>
  setSharedData((prev) => ({ ...prev, appQrPreview: '' }));
const removeUciQr = () =>
  setSharedData((prev) => ({ ...prev, uciQrPreview: '' }));

const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === "applicationNo") {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleaned.length <= 10) {
      setSharedData((prev) => ({ ...prev, applicationNo: cleaned }));
    }
    return;
  }

  if (name === "uci") {
    const cleanValue = value.replace(/[^\d-]/g, "");
    if (cleanValue.length <= 12) {
      setSharedData((prev) => ({ ...prev, uci: cleanValue }));
    }
    return;
  }

  // बाकी formData local रख सकते हैं (date, name, address etc.)
  setFormData((prev) => ({ ...prev, [name]: value }));
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
    const pdf = new jsPDF('p', 'mm', 'letter');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Convert canvas px to mm
    const pxToMm = (px) => (px * 25.4) / 96;

    const canvasWidthMm = pxToMm(canvas.width);
    const canvasHeightMm = pxToMm(canvas.height);

    const scale = pageWidth / canvasWidthMm; // scale to fit width
    const imgWidth = canvasWidthMm * scale;
    const imgHeight = canvasHeightMm * scale;

    let position = 0;
    let remainingHeight = imgHeight;

    while (remainingHeight > 0) {
      const heightToPrint = Math.min(remainingHeight, pageHeight);

      pdf.addImage(
        imgData,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );

      remainingHeight -= pageHeight;
      position -= pageHeight;

      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }

    pdf.save('Correspondence Letter.pdf');
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
            <h1>Correspondance</h1>
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

          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="PEER COLONY, VILL SAID KHERI&#10;PATIALA 140401&#10;PUNJAB, INDIA"
              rows="4"
            />
          </div>

          <div className="form-group">
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
          style={{padding: "10px 58px 20px 22px" }}
        >
          <div className="letter-header">
            <div className="canada-logo">
              <img 
                src="Citizenship-logo.png" 
                alt="Symbol of the Government of Canada"
                className="official-logo"
                style={{marginBottom: "22px",width: "320px"}}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
             
            </div>
         
          </div>

          <div className="letter-content" style={{ paddingLeft: '50px', paddingTop: '0px' }}>
            <div className="date-section">
              <p>Date: {displayDate}</p>
            </div>

            <div className="reference-section" style={{marginBottom:"0px"}}>
              <div className="reference-numbers" style={{marginBottom:"0px"}}>
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
               
            </div>

           <div className="recipient-address">
              {formData.address && (
                <div className="address-lines">
                  {formData.address.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div> 

            <div className="greeting" style={{ marginTop: 57 }}>
              <p>
                <span style={{ fontSize: '14px' }}>Dear &nbsp;</span> {formData.name || 'DEEPAK SINGH'},</p>
            </div>

            <div className="letter-body">
               <h4 style={{ marginBottom: "12px" }}><strong>RE: validity of your biometric information</strong></h4>
              <p className=''>
                Thank you for providing your biometric information (i.e. digital fingerprints and photograph) in
                support of your temporary resident application to Canada. The purpose of this letter is to notify
                you that your biometric information is valid until {formData.validityDate || '2033/11/07'} for subsequent temporary resident applications to Canada.
              </p>
              <h4 style={{ marginBottom: "16px" }}><strong>What you need to know for subsequent temporary resident (TR) applications:</strong></h4>
              <ul className="requirements-list" style={{ marginBottom: "12px" }}>
                <li style={{ marginBottom: "15px" }}> You will not be required to provide your biometric information again in support of any
subsequent temporary resident applications you make within the validity date indicated
above.
</li>
                <li style={{ marginBottom: "15px" }}>However, if you wish to extend the validity of your permit or visa beyond the validity date
indicated above you can provide your biometric information again and pay the associated
fee for another ten-year validity.
</li>
                <li style={{ marginBottom: "15px" }}>Please note that you will be required to provide your biometric information in support of any
permanent resident application, even if you apply within the validity date indicated above.
</li>
              <li style={{ marginTop: "15px" }}>
  In addition to this letter, you can check the validity date of your biometric information using:
  <ul style={{ marginTop: "4px", marginBottom: "0px", paddingLeft: "20px" }}>
    <li>Your MyAccount at: <a className="document-link" href="https://www.cic.gc.ca/English/e-services/account.asp" target="_blank" rel="noopener noreferrer">www.cic.gc.ca/English/e-services/account.asp</a></li>
    <li>The Biometrics Validity Tool that is available on Immigration, Refugees and Citizenship Canada’s website <a className="document-link" href="https://www.cic.gc.ca/English/e-services/account.asp" target="_blank" rel="noopener noreferrer">www.cic.gc.ca</a></li>
  </ul>
</li>

</ul>




            </div>

            
            {/* Footer Section */}
            <div className="document-footer" style={{marginTop:'170px'}}>
              <div className="canada-wordmark">
                <div className="canada-logo-small">
                  <span className="canada-text">
                    <img src="wmms-spl.png" alt="Canada" className="official-logo2" style={{width: '122px'}} /></span>
                </div>
                <div className="document-reference">
                  <span>IMM5825 (10-2018) E</span>
                </div>
              </div>
            </div>

          <div  >
            <div style={{ paddingLeft: '38pt' }}>
            <h4 style={{ fontWeight: 'bold', textAlign: 'center',marginTop:'170px' }}>IMPORTANT</h4>
            <ul style={{ marginTop: '16px' }}>
              <li style={ {fontSize: '13px'} }>
                <strong>This letter is not a passport or travel document.</strong> You will not be permitted to board your flight without a valid passport or travel document, even if you have this letter with you.
              </li>
              <li style={{ marginTop: '8px', fontSize: '13px' }}>
                <strong>This letter does not allow you to enter or remain in Canada.</strong> Eligibility and admissibility to Canada will be based on current Canada Border Service Agency procedures upon entering Canada.
              </li>
            </ul>
       </div>
          <p style={{ marginTop: '50px', fontSize: '13px' }}>Sincerely,</p>
          <p style={{ marginTop: '20px', fontSize: '13px' }}>16th Floor, 365 Laurier Ave W, Ottawa, ON K1P 6A6</p>
          <p style={{ marginTop: '20px', fontSize: '13px' }}>www.cic.gc.ca</p>

          </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Correspondence;
