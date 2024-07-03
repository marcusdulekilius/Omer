document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            sections.forEach(section => {
                if (section.id === targetId.substring(1)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    const donateButtons = document.querySelectorAll('.donate-btn');
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                donateButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const donateForm = document.querySelector('.card-form form');
    donateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedButton = document.querySelector('.donate-btn.active');
        if (!selectedButton) {
            alert('Please select a donation amount first.');
            return;
        }
        const amount = selectedButton.getAttribute('data-amount');

        let cardNumber = document.getElementById('cardNumber').value.trim();
        cardNumber = cardNumber.replace(/\D/g, '');
        if (cardNumber.length !== 16) {
            alert('Card number must be exactly 16 digits.');
            return;
        }
        cardNumber = cardNumber.replace(/(.{4})/g, '$1 ');

        let cardholderName = document.getElementById('cardName').value.trim();
        cardholderName = cardholderName.replace(/[^a-zA-Z ]/g, '');
        if (cardholderName.length === 0) {
            alert('Please enter a valid cardholder name.');
            return;
        }

        let expiryDate = document.getElementById('expiryDate').value.trim();
        expiryDate = expiryDate.replace(/(\d\d)(\/?)$/, '$1/$2');
        const [month, year] = expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
            alert('Invalid expiry date format. Please use MM/YY.');
            return;
        }
        if (year.length !== 2 || year < currentYear || (year == currentYear && month < currentMonth)) {
            alert('Invalid expiry date. Please enter a valid future date.');
            return;
        }

        let cvv = document.getElementById('cvv').value.trim();
        cvv = cvv.replace(/\D/g, '');
        if (cvv.length !== 3) {
            alert('CVV must be exactly 3 digits.');
            return;
        }

        alert(`Thank you for your donation of $${amount}.`);
        donateForm.reset();
        donateButtons.forEach(btn => btn.classList.remove('active'));
    });

    const formatCardNumber = (value) => {
        let newValue = value.replace(/\D/g, '');
        newValue = newValue.replace(/(.{4})/g, '$1 ');
        return newValue.trim();
    };

    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function() {
        let value = this.value.trim();
        value = value.replace(/\D/g, '');

        if (value.length > 0) {
            value = value.match(/\d{1,4}/g).join(' ').substr(0, 19);
        }
        this.value = value;
    });

    const cardNameInput = document.getElementById('cardName');
    cardNameInput.addEventListener('input', function() {
        let value = this.value.trim();
        value = value.replace(/[^a-zA-Z \s]/g, '');
        value = value.toUpperCase();

        if (value.length > 0) {
            value = value.substr(0, 50);
        }
        this.value = value;
    });

    const expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.addEventListener('input', function() {
        let value = this.value.trim();
        value = value.replace(/\D/g, '');

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        this.value = value.substring(0, 5);
    });

    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function() {
        let value = this.value.trim();
        value = value.replace(/\D/g, '');

        if (value.length > 3) {
            value = value.substring(0, 3);
        }
        this.value = value;
    });
});
