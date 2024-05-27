document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.deleteBtn');

  // Handle delete button click
  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.getAttribute('data-id');
      const response = await fetch(`/delete/${userId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Remove the user from the DOM
        button.parentElement.remove();
      } else {
        console.error('Failed to delete user');
      }
    });
  });

  // Handle edit button click on profile page
  const editButton = document.querySelector('.editBtn');
  if (editButton) {
    editButton.addEventListener('click', () => {
      const userId = editButton.getAttribute('data-id');
      window.location.href = `/edit/${userId}`;
    });
  }

  // Handle create user form submission
  const createUserForm = document.getElementById('createUserForm');
  if (createUserForm) {
    createUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(createUserForm);
      const data = Object.fromEntries(formData.entries());

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
    });
  }

  // Handle edit user form submission
  const editUserForm = document.getElementById('editUserForm');
  if (editUserForm) {
    editUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = editUserForm.getAttribute('data-id');
      const formData = new FormData(editUserForm);
      const data = Object.fromEntries(formData.entries());

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
    });
  }
});
