
//Початок функції яка визначає код, який буде виконано після того, як весь HTML та структура сторінки будуть повністю завантажені
document.addEventListener('DOMContentLoaded', function () {

	//Отримання елементів форми, кнопки та контейнера
	const formInput = document.forms['form-input'];
	const userBtn = document.getElementById('form-input__user-bnt');
	const divContainer = document.getElementById('form-show__text');
	let divCounter = 1;
	let editedDiv;


	// Зупинка стандартної відправки форми
	formInput.addEventListener('submit', function (event) {
		event.preventDefault();
	});

	//Створення функції для задавання стилів бордера для inputs при фокусуванні
	const input = document.querySelectorAll('.form-input__text');

	input.forEach((inputElement) => {
		inputElement.addEventListener('focus', () => {
			inputElement.style.boxShadow = '#B7D5F4 0 0 0.1vw 0.1vw';
		});

		inputElement.addEventListener('blur', () => {
			inputElement.style.boxShadow = '';
		});
	});
	//Кінець функції для задавання стилів бордера для inputs при фокусуванні


	//Валідація введених даних
	const loginRegExp = /^[A-Za-z]{4,16}$/;
	const passwordRegExp = /^[A-Za-z0-9-._]{4,16}$/;
	const emailRegExp = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]/;

	//Створення функції для валідації введених даних та зміни стану кнопки "Add user" відповідно до валідності даних
	formInput.addEventListener('input', () => {
		let testLogin = loginRegExp.test(document.getElementById('login').value);
		let testPassword = passwordRegExp.test(document.getElementById('password').value);
		let testEmail = emailRegExp.test(document.getElementById('email').value);

		let loginValue = document.getElementById('login').value.trim();
		let passwordValue = document.getElementById('password').value.trim();
		let emailValue = document.getElementById('email').value.trim();

		if (testLogin && testPassword && testEmail && loginValue !== '' && passwordValue !== '' && emailValue !== '') {
			userBtn.style.backgroundColor = 'green';
			userBtn.disabled = false;
		}
		else {
			userBtn.disabled = true;
			userBtn.style.backgroundColor = 'red';
		}
	});
	//Кінець функції для валідації введених даних та зміни стану кнопки "Add user" відповідно до валідності даних


//Створення функції для додавання нового користувача або редагування існуючого
	userBtn.addEventListener('click', function addUser() {
		if (userBtn.disabled) {
			return;
		}

		if (editedDiv) {
			// Редагуємо існуючий div
			editedDiv.querySelector('.text-login').textContent = document.getElementById('login').value;
			editedDiv.querySelector('.text-password').innerText = document.getElementById('password').value;
			editedDiv.querySelector('.text-email').innerText = document.getElementById('email').value;

			editedDiv = null; // Знімаємо позначку редагування
		}
		else {
			// Створюємо новий div
			const newDiv = document.createElement('div');
			newDiv.classList.add('new-div');

			const divNumber = document.createElement('span');
			divNumber.textContent = divCounter + '. ';
			divNumber.classList.add('div-number');
			newDiv.appendChild(divNumber);

			const textLogin = document.createElement('p');
			const textPassword = document.createElement('p');
			const textEmail = document.createElement('p');

			newDiv.appendChild(textLogin);
			textLogin.classList.add('text-login');

			newDiv.appendChild(textPassword);
			textPassword.classList.add('text-password');

			newDiv.appendChild(textEmail);
			textEmail.classList.add('text-email');

			textLogin.textContent = document.getElementById('login').value;
			textPassword.innerText = document.getElementById('password').value;
			textEmail.innerText = document.getElementById('email').value;

			const buttonEdit = document.createElement('button');
			buttonEdit.textContent = 'Edit';
			buttonEdit.classList.add('button-edit');

			const buttonDelete = document.createElement('button');
			buttonDelete.textContent = 'Delete';
			buttonDelete.classList.add('button-delete');

			newDiv.appendChild(buttonEdit);
			newDiv.appendChild(buttonDelete);

			divContainer.appendChild(newDiv);

			divCounter++;
		}
		//Кінець функції для додавання нового користувача або редагування існуючого


		//Повернення початкового стану форми і кнопки
		formInput.reset();
		userBtn.disabled = true;
		userBtn.style.backgroundColor = 'red';


//Створення функції для обробки подій натискання кнопок "Delete" та "Edit" у контейнері divs.
		divContainer.addEventListener('click', function (event) {
			const target = event.target;

			if (target.classList.contains('button-delete')) {
				const divToDelete = target.closest('.new-div');
				if (divToDelete && divContainer.contains(divToDelete)) {
					divContainer.removeChild(divToDelete);
					updateDivNumbers();
				}
			}
			else if (target.classList.contains('button-edit')) {
				editedDiv = target.closest('.new-div');
				if (editedDiv) {
					let loginValue = editedDiv.querySelector('.text-login').innerText;
					let passwordValue = editedDiv.querySelector('.text-password').innerText;
					let emailValue = editedDiv.querySelector('.text-email').innerText;
					document.getElementById('login').value = loginValue;
					document.getElementById('password').value = passwordValue;
					document.getElementById('email').value = emailValue;
					document.getElementById('password').type = 'text';
				}
			}
		});
	});
	//Кінець функції для обробки подій натискання кнопок "Delete" та "Edit" у контейнері divs.


	//Створення функції для отримання всіх div в контейнері
	function updateDivNumbers() {

		const divs = divContainer.querySelectorAll('.new-div');

		// Пройтися по всіх div і оновити їх номерацію
		divs.forEach((div, index) => {
			const divNumber = div.querySelector('.div-number');
			if (divNumber) {
				divNumber.textContent = index + 1 + '. ';
			}
		});
		//Кінець функції для отримання всіх div в контейнері


		// Скидання лічильника до 1 і додавання наступного номера
		divCounter = divs.length + 1;
	 }

});
//Кінець функції яка визначає код, який буде виконано після того, як весь HTML та структура сторінки будуть повністю завантажені.

