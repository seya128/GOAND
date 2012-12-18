// スタンプデータ
function loadHasStamp() {
	var data = localStorage.getItem("HasStampData");
	if (!data) { return false; }
	
	hasStampData = JSON.parse(data);
	return true;
}

function saveHasStamp() {
	localStorage.setItem("HasStampData", JSON.stringify(hasStampData));
	console.log("save hasStampData");
}

function deleteHasStamp() {
	localStorage.removeItem("HasStampData");
	DummyStampDataSet();
}


