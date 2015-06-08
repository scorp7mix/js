//
// ���������� ����� ������ ����
//
function addNewMessage(type, text) {
    var messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    var messageContent = document.createElement('div');
    messageContent.innerHTML = text;
    messageContent.className = type;
    chat.appendChild(messageContainer).appendChild(messageContent);
}

//
// AJAX-������ � ������� �� �����
//
function ajaxRequest(input) {
    console.log("ajax");
    var request = new XMLHttpRequest();

    request.open('GET', 'ajax.php?input=' + input);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            addNewMessage('message-content message-request', input);
            addNewMessage('message-content message-response', request.responseText);
            chat.scrollTop = chat.scrollHeight;
        }
    }
}

//
// ��������� ������
//
function newMessage() {
    var inputText = document.getElementById('inpText').value;
    document.getElementById('inpText').value = '';
    inputText ? ajaxRequest(inputText) : false;
}

//
// ����� ����������
//
var chat;
//
// ����� �����
//
window.onload = function () {

    chat = document.getElementById('divResult');

    document.getElementById('btnRun').onclick = newMessage;
};