import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import './Biometric.css';

const Biometric = ({ sharedData, setSharedData }) => {
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

    pdf.save('Biometrics Collection Letter.pdf');
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
        day: '2-digit'
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
            <h1>Biometric</h1>
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
              value={formData.applicationNo}
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
              value={formData.uci}
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
  <label>address Name:</label>
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
         style={{ paddingTop:'0',paddingRight: '66px',paddingleft: '38px' }}
        >
          <div className="letter-header" style={{marginBottom:"0"}}>
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
            <div className="date-section" style={{ marginBottom: '0px' }}>
              <p>Date: {displayDate}</p>
            </div>

            <div className="reference-section" style={{marginBottom:"0px"}}>
              <div className="reference-numbers" style={{marginBottom:"0px"}}>
                <div className="uci-section">
                  <p>UCI: {sharedData.uci || '11-2943-5159'}</p>
                  {(sharedData.uciQrPreview || uciBarcodeDataUrl) && (
                    <div className="barcode-container-small" style={{ display: 'flex',alignItems: 'center', marginLeft: '42px',marginBottom: '0px' }}>
                      <img src={sharedData.uciQrPreview || uciBarcodeDataUrl} alt="UCI Code" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                      <img src={sharedData.uciQrPreview || uciBarcodeDataUrl} alt="UCI Code Duplicate" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                    </div>
                  )}
                </div>
                <div className="app-section">
                  <p style={{marginRight: '96px'}}>Application no.: {sharedData.applicationNo || 'V353364593'}</p>
                  {(sharedData.appQrPreview || barcodeDataUrl) && (
                    <div className="barcode-container-small" style={{ display: 'flex',  alignItems: 'center', justifyContent: 'flex-end', marginLeft: '10px',marginBottom: '0px' }}>
                      <img src={sharedData.appQrPreview || barcodeDataUrl} alt="Application Code" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                      <img src={sharedData.appQrPreview || barcodeDataUrl} alt="Application Code Duplicate" className="small-barcode" style={{ width: `${BARCODE_WIDTH_PX}px`, height: `${BARCODE_HEIGHT_PX}px` }} />
                    </div>
                  )}
                </div>
              </div>
               
            </div>

{formData.name && (
    <p style={{  marginBottom: "30px",fontFamily:"sans-serif" }}>
      {formData.name}
    </p>
  )}


           <div className="recipient-address">
              {formData.address && (
                <div className="address-lines">
                  {formData.address.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div> 

            <div className="greeting" style={{ marginTop: 20 }}>
               <h2 style={{fontSize:"18px", textAlign: "center" }}>Biometric Instruction Letter</h2>
              <p>
                <span style={{ fontSize: '14px' }}>Dear &nbsp;</span> {formData.name || 'Pooja Saran'},</p>
            </div>

            <div className="letter-body">
               <p>This letter refers to your application to Immigration, Refugees and Citizenship Canada (IRCC) for one of the
                following documents: 
                </p>
                   <ul className="requirements-list" style={{ marginBottom: "2px" }}>
                    <li style={{ marginBottom: "2px" }}>temporary resident permit;</li>
                    <li style={{ marginBottom: "2px" }}>work permit;</li>
                    <li style={{ marginBottom: "2px" }}>study permit;</li>
                    <li style={{ marginBottom: "2px" }}>temporary resident visa;</li>
                    <li style={{ marginBottom: "2px" }}>visitor record;</li>
                    <li style={{ marginBottom: "2px" }}>permanent resident application; or</li>
                    <li style={{ marginBottom: "2px" }}>permanent resident card renewal.</li>

              </ul>

              <p style={{ marginTop: "12px" }}>
        Under the <i>Immigration and Refugee Protection Act</i> (IRPA) and its{" "}
       Regulations, you are required to have your fingerprints scanned
        and your photograph taken (your biometrics) at a biometric collection
        service point to help Visa Officers determine if you may enter or stay
        in Canada. Most applicants will need to give their biometrics at a
        biometric collection service point abroad <b>before</b> they travel to
        Canada.
      </p>

      <p className="mt-4">
        Only those who are eligible to apply for a{" "}
        <a
          href="#"
          className="document-link underline hover:text-blue-800"
        >
          work permit
        </a>{" "}
        or a{" "}
        <a
          href="#"
          className="document-link underline hover:text-blue-800"
        >
          study permit
        </a>{" "}
        at a designated port of entry can give their biometrics upon arrival.
      </p>

        <h2 className="mt-3 font-bold text-lg" style={{ textAlign: "left" }}>
        Why is IRCC collecting my fingerprints and photograph?
      </h2>

      <p className="mt-2" style={{marginBottom:"0px"}}>
        Your biometric information will be used under the{" "}
        <i>Immigration and Refugee Protection Act</i> (IRPA) and its
        Regulations to determine if you may enter or stay in Canada. Your
        fingerprints may also be shared with law enforcement agencies in Canada
        and may be used for the enforcement of any Canadian or provincial law.
        For more information about why the Government of Canada collects
        biometrics, how it uses your information and how it protects your
        privacy, please visit:
      </p>

      <ul className="list-disc list-inside" style={{ padding: "0",listStyle:"none" }}>
        <li>
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/facts.html"
            className="document-link underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/facts.html 
          </a>
         &nbsp;

          &nbsp;

          and
        </li>
        <li>
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/protecting-appliccants-privacy.html"
            className="document-link underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/protecting-appliccants-privacy.html
          </a>
        </li>
      </ul>
            


            </div>

            
            {/* Footer Section */}
            <div className="document-footer" style={{marginTop:'90px'}}>
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
            <div style={{marginTop:"100px" }}>
            <div style={{margin: "0 auto", fontFamily: "Arial, sans-serif", fontSize: "13px", lineHeight: "1.6", color: "#000" }}>
      
      {/* Section Header with background */}
       <h2 style={{ display: "inline-block", marginBottom: "8" }}>
        What you need to do next:
      </h2>

      <p>
        You need to take this letter with you and go <b>in person</b> to any biometric
        collection service point to have your fingerprints and photograph taken.{" "}
        <b style={{ textDecoration: "underline" }}>Before you go, you need to make an appointment.</b>
      </p>

      <ul style={{ padding: "0 20px" }}>
        <li style={{ marginTop: "10px" }}>
          If you are outside Canada or the United States, you may go to any Visa
          Application Centre (VAC) most convenient to you.
        </li>
        <li style={{ marginTop: "10px" }}>
          If you are in the United States, you may go to a United States Citizenship
          and Immigration Services (USCIS), Application Support Center (ASC) or a
          Visa Application Centre (VAC) located in the United States or its
          territories.
        </li>
        <li style={{ marginTop: "10px" }}>
          If you are in Canada, you may go to a designated Service Canada location.
        </li>
      </ul>

      <p style={{ marginTop: "10px" }}>
        For more information on where to give your biometrics, please visit: <br />
        <a
          href="https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/where-to-give-biometrics.html"
          style={{ color: "blue", textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.canada.ca/en/immigration-refugees-citizenship/campaigns/biometrics/where-to-give-biometrics.html
        </a>
      </p>

      <p style={{ fontWeight: "bold", marginTop: "10px" }}>What you need to bring with you:</p>

      <p style={{ marginTop: "10px" }}>
        When you present yourself at the biometric collection service point of your
        choice, <b style={{ textDecoration: "underline" }}>you must</b> bring the following:
      </p>

      <ul style={{ padding: "0 20px",marginLeft:"20px" }}>
        <li>
          a <b>copy of this letter</b>, and
        </li>
        <li>
          the <b>passport </b> or <b> travel document </b> that you referenced in your
          application.
        </li>
      </ul>

      <p style={{ fontWeight: "bold", marginTop: "20px" }}>
        Note: This letter is also your proof that:
      </p>

      <ul style={{ padding: "0 20px" }}>
        <li>you have paid the biometric fee; or</li>
        <li>
          you have claimed an exemption from the biometric fee under section 315.1
          of the <i>Immigration and Refugee Protection Regulations</i> (IRPR). If,
          after reviewing your request, it is determined that you do not qualify for
          an exemption and are required to pay the biometric fee, you will be
          contacted by IRCC and your fee payment options will be explained to you.
        </li>
      </ul>
<div
  style={{
    borderTop: "1px solid #000", // 🔹 ऊपर वाली लाइन
    paddingTop: "10px",          // लाइन और content के बीच spacing
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    maxWidth: "900px",
    margin: "20px auto"
  }}
></div>
       <p style={{ fontWeight: "bold",}}>
        FOR OFFICIAL USE AT BIOMETRIC COLLECTION SERVICE POINTS:
      </p>

      <p>
        <b>Family Name:</b> Saran
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>Given Name:</b> Pooja
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>Date of Birth:</b> 1999/11/15 &nbsp; (yyyy/mm/dd)
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>Gender:</b> M
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>Country of Birth:</b> India (205)
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>Citizenship:</b> India (205)
      </p>
      <p  style={{marginTop: "3px"}}>
        <b>IRCC No.:</b> 1000022239093
      </p>

  {/* Left Box */}
        <div>
          <img 
            src="barcode.png" 
            alt="VAC Barcode"
            style={{ width: "100%",  }}
          />
        </div>
<div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#000",
      }}
    > 
<div class="document-reference" style={{marginTop:"30px",marginBottom:"20px",textAlign:"center"}}><span>IMM5825 (10-2018) E</span></div>
      <div
       
      >
   {/* Two-column layout: left icon column, right content column */}
<div style={{ display: "flex", alignItems: "stretch", border: "1px solid #000",      marginTop:"130px", }}>
  {/* Left icon column with full border-right */}
  <div
    style={{
      width: "60px",
      padding: "10px",
      boxSizing: "border-box",
      borderRight: "1px solid #000",   // 🔹 यह border है जो पूरा नीचे तक जाएगा
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: "#fff"
    }}
  >
    {/* Triangle warning icon */}
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#f5b041" d="M1 21h22L12 2 1 21z" />
      <path fill="#fff" d="M13 16h-2v2h2v-2zM13 7h-2v7h2V7z" />
    </svg>
  </div>

  {/* Right content column */}
  <div style={{ flex: 1, padding: "0px 12px 12px 12px" }}>
    {/* Title row (bold) */}
    <div style={{ fontWeight: 700, marginBottom: "8px" }}>
      Important Information
    </div>

    <div style={{ fontWeight: 700, marginBottom: "8px" }}>
      You have 30 days from the date of this letter to present yourself at a biometric collection service point to give your biometrics:
    </div>

    <div style={{ marginBottom: "10px", textAlign: "left" }}>
      You must visit a biometric collection service point to have your fingerprints scanned and photograph taken{" "}
      <b>on or before</b> September 07, 2025.{" "}
      <u>
        If you do not comply, your application may be refused.
      </u>{" "}
      If your application is refused, you will have to submit a new application and pay the applicable fees.
    </div>

    <div style={{ marginBottom: "10px" }}>
      If you cannot provide your biometric information (photograph and/or fingerprints) or if you need more than the 30 days, please complete a webform at{" "}
      <a
        href="https://www.cic.gc.ca/english/contacts/web-form.asp"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#0645AD", textDecoration: "underline" }}
      >
        https://www.cic.gc.ca/english/contacts/web-form.asp
      </a>{" "}
      and provide a detailed explanation.
    </div>

    <div style={{ fontWeight: 700, marginTop: "6px", marginBottom: "6px" }}>
      If you have injuries or medical conditions:
    </div>

    <div style={{ marginBottom: "10px" }}>
      Some injuries and medical conditions may affect your ability to provide your ten (10) fingerprints or photograph. If you have a temporary injury or condition on your face and/or hands, you should wait until the injury heals or condition improves before you give your biometrics. If you have a permanent injury or medical condition on your face or hands, your photograph will still be taken and you will be asked to provide as many fingerprints as possible.
    </div>

    <div style={{ fontWeight: 700, marginTop: "6px", marginBottom: "6px" }}>
      If you hold multiple citizenships:
    </div>

    <div>
      You must use the same travel document throughout the application process, including when you go to a biometric collection service point to give your biometrics. You must also use the same travel document upon arrival in Canada.
    </div>
  </div>
</div>

      </div>
    </div>

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

export default Biometric;
