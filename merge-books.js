const fs = require('fs');
const path = require('path');

const booksJsonDir = path.join(__dirname, 'src', 'books-json');

const bookFolders = {
  'Family_and_Friends_1_SB clean/cleaned_book': 'family-and-friends-1-2e-cb.json',
  'Family_and_Friends_2_SB clean/cleaned_book_ff2': 'family-and-friends-2-2e-cb.json',
  'Family_and_Friends_3_SB clean/cleaned_book_ff3': 'family-and-friends-3-2e-cb.json',
  'Family_and_Friends_4_SB clean/cleaned_book_ff4': 'family-and-friends-4-cb.json',
  'Family_and_Friends_Starter_CB clean/cleaned_book_starter': 'family-and-friends-starter-2e.json',
  'Four_Corners_1 clean/cleaned_book_fc1': 'four-corners-1-sb.json',
  'Four_Corners_2 clean/cleaned_book_fc2': 'four-corners-2-sb.json',
  'Four_Corners_3 clean/cleaned_book_fc3': 'four-corners-3-sb.json',
  'Four_Corners_4 clean/cleaned_book_fc4': 'four-corners-4-sb.json',
  'Viewpoint_1_Students_Book clean/cleaned_book_vp1': 'viewpoint-1-sb.json',
  'Viewpoint_2_Students_Book clean/cleaned_book_vp2': 'viewpoint-2-sb.json',
};

Object.entries(bookFolders).forEach(([folderPath, jsonFileName]) => {
  console.log(`\n=== Processing book: ${jsonFileName} ===`);
  
  const fullFolderPath = path.join(booksJsonDir, folderPath);
  const mainJsonPath = path.join(booksJsonDir, jsonFileName);
  
  if (!fs.existsSync(fullFolderPath)) {
    console.log(`[WARNING] Folder not found: ${fullFolderPath}`);
    return;
  }
  
  let bookData;
  try {
    bookData = JSON.parse(fs.readFileSync(mainJsonPath, 'utf-8'));
  } catch (e) {
    console.log(`[ERROR] Cannot read ${jsonFileName}:`, e.message);
    return;
  }
  
  const pageFiles = fs.readdirSync(fullFolderPath)
    .filter(f => f.match(/^page_\d+\.json$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });
  
  console.log(`[OK] Found ${pageFiles.length} page files`);
  
  const pages = [];
  
  pageFiles.forEach((pageFile) => {
    const pagePath = path.join(fullFolderPath, pageFile);
    try {
      const pageData = JSON.parse(fs.readFileSync(pagePath, 'utf-8'));
      
      const fullText = pageData.structure?.fullTextReadingOrder?.join('\n') || 
                       pageData.text?.join('\n') || 
                       JSON.stringify(pageData);
      
      const pageNumber = parseInt(pageFile.match(/\d+/)[0]);
      
      pages.push({
        pageNumber: pageNumber,
        text: fullText.substring(0, 10000)
      });
    } catch (e) {
      console.log(`[WARNING] Cannot read ${pageFile}:`, e.message);
    }
  });
  
  bookData.pages = pages;
  bookData.totalPages = pages.length;
  bookData.processedAt = new Date().toISOString();
  
  fs.writeFileSync(mainJsonPath, JSON.stringify(bookData, null, 2));
  
  console.log(`[SUCCESS] Updated ${jsonFileName} with ${pages.length} pages`);
});

console.log('\n=== All done! You can now deploy again. ===');
