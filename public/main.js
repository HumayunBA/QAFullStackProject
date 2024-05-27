document.addEventListener('DOMContentLoaded', async () => {
  
  if (document.getElementById('userList')) {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; 
      userData.forEach(user => {
        const listItem = document.createElement('li');

        const userLink = document.createElement('a');
        userLink.textContent = `${user.name} (${user.nickname})`;
        userLink.href = `/user.html?id=${user.id}`;
        listItem.appendChild(userLink);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteBtn');
        deleteButton.setAttribute('data-id', user.id);
        listItem.appendChild(deleteButton);

        userList.appendChild(listItem);
      });

      const deleteButtons = document.querySelectorAll('.deleteBtn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
          e.stopPropagation();
          const userId = button.getAttribute('data-id');
          try {
            const response = await fetch(`/delete/${userId}`, {
              method: 'POST',
            });
            if (response.ok) {
              button.parentElement.remove();
            } else {
              console.error('Failed to delete user');
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  if (document.querySelector('.container h1').textContent === 'User Details') {
    const userId = getUserIdFromURL();
    try {
      const response = await fetch(`/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const user = await response.json();
      document.getElementById('name').textContent = user.name;
      document.getElementById('nickname').textContent = user.nickname;
      document.getElementById('age').textContent = user.age;
      document.getElementById('bio').textContent = user.bio;

      const editButton = document.createElement('a');
      editButton.textContent = 'Edit';
      editButton.classList.add('editBtn');
      editButton.href = `/edit.html?id=${user.id}`;
      document.querySelector('.container').appendChild(editButton);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const createUserForm = document.getElementById('createUserForm');
  if (createUserForm) {
    createUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(createUserForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          window.location.href = '/';
        } else {
          console.error('Failed to create user');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    });
  }

  const editUserForm = document.getElementById('editUserForm');
  if (editUserForm) {
    const userId = getUserIdFromURL();
    try {
      const response = await fetch(`/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data for editing');
      }
      const user = await response.json();
      document.getElementById('name').value = user.name;
      document.getElementById('nickname').value = user.nickname;
      document.getElementById('age').value = user.age;
      document.getElementById('bio').value = user.bio;
    } catch (error) {
      console.error('Error fetching user data for editing:', error);
    }

    editUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(editUserForm);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await fetch(`/update/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          window.location.href = '/';
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    });
  }
});

// Function to extract user ID from URL
function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}
