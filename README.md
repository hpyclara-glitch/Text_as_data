# Text as data
# Changes 
## Home Page 
In the home page, an inviting text was created in black with a background picture of Frankenstein.jpeg and paper.jpg. Additionally, my name and the links to the Bodleian Library, the licence, the encoding manual, and the Shelley Godwin Archive are included by using a golden text. The viewers can go to the hyperlinks by clicking the corresponding words. Lastly, pages from this digital edition are put inside the text container with the background of paper.jpg.

The photographs of both authors (Mary_Shelley.tif.jpg and Percy_Shelley.jpg) are added with a flipped function. By clicking on the the picture or the text box of Mary Shelly in the home page, the flipImage() function will be activated. It changes Mary Shelly’s autograph and name in the name box into those of Percy Shelly and vise-versa. 

The  changes mentioned above are made in the index.html, the style.css and the script.js. The background color of the home page is set to pink. The style of text containers, pictures and table are set correspondingly in the style.css: 
1. the text containers: .container1, .container2, and .box;
2. the flipped pictures: .flip-container, .flipper, .flipped, .front, .back, .font img, .back img, .front. p, .back.p; 
3. the table: .table-container, .table-container h5, table, td th, tr-nthchild(even).

## Leaf Pages
## Metadata Section
On every leaf page (.html), buttons are added in the matadata section. A previous button and a next button are added to easily navigate to the neighboring pages. After clicking the previous or next button, the goToPage(url) function will direct to the url entered inside the function. A reading mode button, a show deletion button and an optional note button are included as well. By clicking on the reading mode button in the page, the reading() function will display the text inline and hide the deleted texts. When the viewers click the show deletion button, it activates toggleDel() function and displays the deleted text by authors. The note button is only shown in the 22r.html. By clicking the button, the shownotes() function, which will display or hide the notes, is activated. The style of these buttons are made in the style.css: 
> .header-container,.navigation, .navigation p, .navigation button, .navigation button:hover, #folio; .modes, .modes button, .modes button:hover.

The metadata section added statistics and function that made choosing hands possible. The statistics include the total number of additions, the total number of deletions, the number of corrections by Percy Shelley and the number of corrections by Mary Shelley. The statistics are coded in “Frankenstein_meta.xsl”. The dropdown list of hands is activated by the selectHand() function. It is used to:
1. show the text from both authors in black by clicking Both Hands, 
2. display the text written and corrected by Mary Shelley in purple and the text added or deleted (corrected) by Percy Shelley in gray by clicking Mary Shelley’s Hand Highlighted, 
3. the text by Percy Shelley in green and that by Mary Shelley in gray by clicking Percy Shelley’s Hand Highlighted.

## Text Section
The transcription of the text in each pages (.xml) are encoded based on instructions. All the additions and deletions are encoded with the attributes, including type(overwritten, crossedOut), places (supralinear, intralinear, overwritten), and the hands ( Mary: #MWS or Percy:#PBS). All the line breaks  <lb/> are added. All the superscript (<hi rend="sup">) and underlined text (<hi rend="u">) is indicated respectively.

The style of different elements and attributes are added in the Frankenstein_text.xsl and the style.css. The changes are made in the Frankenstein_text.xsl, consisting of  the line breaks, the superscript text, the underlined text, the double-underlined text(class=“doubleunderline”), the circled page number on the page(<xsl:attribute name="style">) with style in xsl, the overwritten text (class= “overwAdd” or “overwDel”). The additions of text section are made in the style.css: 
> .supraAdd, .overwAdd, .overDel, .doubleunderline, .hidden, .poem, .mws, .pbs.

## Bonus Part 
I put all the html and xml files into the corresponding folders. To make html find JavaScript and css files, I changed the locations of JavaScript and css file on the script tag in the html files. I also redefined the variable folio_xml and changed the locations of xml and xsl file in the statsLoader() and documentLoader() from JavaScript. 
