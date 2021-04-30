import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Document, Page, pdfjs } from "react-pdf";
import PdfFile from "./privacyPolicy.pdf";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PrivacyPage = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="text-center">
      <h1>Privacy Policy</h1>
      <div className="text-center">
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Document file={PdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      <div>
        <br />
        <br />
        <br />
        <Button
          // size="lg"
          variant="primary"
          onClick={() =>
            pageNumber === 1
              ? setPageNumber(numPages)
              : setPageNumber(pageNumber - 1)
          }
        >
          <ArrowLeftCircle size={35} />
        </Button>
        <Button variant=""></Button>
        <Button
          variant="primary"
          onClick={() =>
            pageNumber === numPages
              ? setPageNumber(1)
              : setPageNumber(pageNumber + 1)
          }
        >
          <ArrowRightCircle size={35} />
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default PrivacyPage;
