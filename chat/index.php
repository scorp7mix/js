<!DOCTYPE html>
<html>
<head>
	<meta charset="windows-1251">
	<title>AJAX</title>
	<link href="style.css" rel="stylesheet">
	<script src="script.js"></script>
</head>
<body>
	<div id="divResult"></div>
	<div id="solution">
	    <p>Доступные команды:</p>
	    <ul>
	        <li>hello</li>
	        <li>age</li>
	        <li>name</li>
	        <li>time</li>
	        <li>date</li>
	        <li>goodbye</li>
	    </ul>
	</div>
	<form onsubmit="return false" id="newMessage">
        <input id="inpText">
        <button id="btnRun">Отправить</button>
    </form>
</body>
</html>
