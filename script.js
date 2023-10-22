function redirectToTodo() {
    const nameInput = document.getElementById('text_field');
    const name = nameInput.value.trim();
    
    if (name === '') {
      // If the name input is empty, show an error message
      const errorDiv = document.getElementById('error');
      errorDiv.textContent = 'Please enter your name';
      return;
    }
    
    // Save the name to localStorage so it can be used on the todo.html page
    localStorage.setItem('name', name);
    
    // Redirect to the todo.html page
    window.location.href = 'todo.html';
  }
  
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', redirectToTodo);
  