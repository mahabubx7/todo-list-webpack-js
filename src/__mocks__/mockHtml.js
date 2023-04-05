export default document.body.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToDo List</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div id="test"></div>
    <nav class="topbar">
      <h1>Today's To Do</h1>
      <button id="reload"><i class="ri-refresh-line"></i></button>
    </nav>
    <input type="text" id="input" placeholder="Add to your list...">
    <ul id="list"></ul>
    <button id="btn-clear">clear all completed</button>
  </div>
</body>
</html>

`;