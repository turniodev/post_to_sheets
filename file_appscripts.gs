function doPost(request) {
  const files = JSON.parse(request.postData.contents)
  const folderId = "__________________________________________"; // Thay đổi id của thư mục cần lưu file tại đây
  const folder = DriveApp.getFolderById(folderId);
  const output = []
  files.forEach((file,index)=> {
  const datafile = Utilities.base64Decode(file.data);
  const blob = Utilities.newBlob(datafile, file.type, file.name);
  const newFile = folder.createFile(blob);
  const url = newFile.getUrl();
  const id = newFile.getId();
  output[index] = { status: "success", name: file.name, id: id, view: url, link: `https://drive.google.com/thumbnail?id=${id}`}
  })
  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON); 
}

function doGet() {
  let spreadsheetId = "___________________ID SHET_______________________"; // ID của bảng tính Google
  let sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  let data = sheet.getDataRange().getValues();
  let headers = data[0];
  let dataArray = [];

  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].toLowerCase().replace(/\s+/g, "_")] = row[j];
    }
    dataArray.push(obj);
  }

  return ContentService.createTextOutput(JSON.stringify(dataArray)).setMimeType(
    ContentService.MimeType.JSON
  );
}
