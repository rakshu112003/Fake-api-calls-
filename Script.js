const userList = document.getElementById('userList');

// Create a message box
const messageBox = document.createElement('div');
messageBox.id = 'messageBox';
document.body.insertBefore(messageBox, userList);

function showMessage(message, color = 'green') {
  messageBox.textContent = message;
  messageBox.style.color = color;
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}

// GET Users
document.getElementById('getUsers').addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.id}: ${user.name} (${user.email})`;
        userList.appendChild(li);
      });
      showMessage('Users fetched successfully!');
    })
    .catch(error => showMessage('Error fetching users', 'red'));
});

// POST User
document.getElementById('addUser').addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: 'New User',
      email: 'newuser@example.com'
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then(res => res.json())
  .then(data => showMessage(`User Added: ${data.name}`))
  .catch(error => showMessage('Error adding user', 'red'));
});

// PUT User
document.getElementById('updateUser').addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/users/1', {
    method: 'PUT',
    body: JSON.stringify({
      name: 'Updated User',
      email: 'updateduser@example.com'
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
  .then(res => res.json())
  .then(data => showMessage(`User Updated: ${data.name}`))
  .catch(error => showMessage('Error updating user', 'red'));
});

// DELETE User
document.getElementById('deleteUser').addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/users/1', { method: 'DELETE' })
    .then(() => showMessage('User Deleted!'))
    .catch(error => showMessage('Error deleting user', 'red'));
});

