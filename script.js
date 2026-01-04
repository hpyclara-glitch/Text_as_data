// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let folio_xml = "../xml/" + tei_xml+ ".xml";
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {
    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("../Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
function statsLoader() {
  Promise.all([
    fetch(folio_xml).then(response => response.text()),
    fetch("../Frankenstein_meta.xsl").then(response => response.text())
  ])
  .then(function ([xmlString, xslString]) {
    var parser = new DOMParser();
    var xml_doc = parser.parseFromString(xmlString, "text/xml");
    var xsl_doc = parser.parseFromString(xslString, "text/xml");

    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl_doc);
    var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

    var criticalElement = document.getElementById("stats");
    criticalElement.innerHTML = ''; // Clear existing content
    criticalElement.appendChild(resultDocument);
  })
  .catch(function (error) {
    console.error("Error loading documents:", error);
  });
}


  // Initial document load
  documentLoader();
  statsLoader();

  // Event listener for sel1 change
function selectHand(event) {
  var visible_mary1 = document.getElementsByClassName("#MWS");
  var visible_mary2 = document.querySelectorAll(".mws");
  var visible_percy1 = document.getElementsByClassName("#PBS");
  var visible_percy2 = document.querySelectorAll(".pbs");
  // Convert the HTMLCollection to an array for forEach compatibility
  var MaryArray1 = Array.from(visible_mary1);
  var MaryArray2 = Array.from(visible_mary2);
  var PercyArray1 = Array.from(visible_percy1);
  var PercyArray2 = Array.from(visible_percy2);
  if (event.target.value == 'both') {
  //write an forEach() method that shows all the text written and modified by both hand (in black?). The forEach() method of Array instances executes a provided function once for each array element
    MaryArray1.forEach(function toggle(color1){
     color1.style.color = "black";
    });
    MaryArray2.forEach(function toggle(color2){
     color2.style.color = "black";
    });
    PercyArray1.forEach(function toggle(color3){
      color3.style.color = "black";
      })
    PercyArray2.forEach(function toggle(color4){
      color4.style.color = "black";
      })
  } else if (event.target.value === 'Mary') {
    //write an forEach() method that shows all the text written and modified by Mary in a different color (or highlight it) and the text by Percy in black. 
    MaryArray1.forEach(function toggle(color5){
     color5.style.color = "rgba(222, 51, 128, 0.95)";
    });
    MaryArray2.forEach(function toggle(color6){
     color6.style.color = "rgba(222, 51, 128, 0.95)";
    });
    PercyArray1.forEach(function toggle(color7){
      color7.style.color = "grey";
      })
    PercyArray2.forEach(function toggle(color8){
      color8.style.color = "grey";
      })
  } else {
    //write an forEach() method that shows all the text written and modified by Percy in a different color (or highlight it) and the text by Mary in black.
    PercyArray1.forEach(function toggle(color9){
      color9.style.color = "rgba(153, 213, 93, 1)";
      });
    PercyArray2.forEach(function toggle(color10){
      color10.style.color = "rgba(153, 213, 93, 1)";
      })
    MaryArray1.forEach(function toggle(color11){
     color11.style.color = "grey";
    })
    MaryArray2.forEach(function toggle(color12){
     color12.style.color = "grey";
    });
  }
}
// write another function that will toggle the display of the deletions by clicking on a button
function toggleDel(){
  Array.from(document.getElementsByTagName('del')).forEach(function toggle(show){
    if (show.style.display ==='block'){
      show.style.color = "rgba(4, 3, 3, 0.95)";
    } else if (show.style.display ==='none'){
      show.style.display = "inline";
    } else{     
      show.style.display = "none";
    }
  })
}

// EXTRA: write a function that will display the text as a reading text by clicking on a button or another dropdown list, meaning that all the deletions are removed and that the additions are shown inline (not in superscript)


function reading(){
  const supralinearElements = document.querySelectorAll('.supraAdd');
  supralinearElements.forEach(function(element) {
    const currentPosition = element.style.verticalAlign || 'super';
    const isAtBaseline = (currentPosition === 'baseline');
    if (isAtBaseline) {
      element.style.verticalAlign = 'super';
      element.style.fontSize = "smaller";
    } else {
      element.style.verticalAlign = 'baseline';
      element.style.fontSize = "medium";
    }
  });
  
  const deletedElements = document.getElementsByTagName('del');
  Array.from(deletedElements).forEach(function(del) {
    const currentDisplay = del.style.display || 'inline';
    if (currentDisplay === 'inline') {
      del.style.display = 'none';
    } else {
      del.style.display = 'inline';
    }
  });
}


function flipImage() {
    const flipper = document.getElementById('flipper');
    const button = document.getElementById('name');
    flipper.classList.toggle('flipped');
    if (flipper.classList.contains('flipped')) {
        button.textContent = 'Percy Shelley';
    } else {
        button.textContent = 'Mary Shelley';
    }
}

function goToPage(url) {
  window.location.href = url;
}

function shownotes(){
  var notes = document.querySelectorAll('.hidden');
  Array.from(notes).forEach(function(note){
  if (note.style.display === "none"){
    note.style.display = "inline";
  }else{
    note.style.display = "none";
  }
  });
}
