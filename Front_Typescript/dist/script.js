var _a, _b, _c;
function transfert() {
    const montant = document.getElementById('montant').value;
    const expediteur = document.getElementById('expediteur').value;
    const destinataire = document.getElementById('destinataire').value;
    const data = {
        montant: montant,
        numero_emetteur: expediteur,
        numero_beneficiaire: destinataire,
    };
    fetch('http://127.0.0.1:8000/api/transferts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then((result) => {
        var _a, _b;
        console.log(result.message);
        if (result.codeRetrait) {
            console.log('Code de retrait: ' + result.codeRetrait);
        }
        if (result.emetteur) {
            document.getElementById('expediteur_nom').value = result.emetteur.nom;
        }
        if (result.beneficiaire) {
            document.getElementById('destinataire_nom').value = result.beneficiaire.nom;
        }
        if (result.message.includes('Transfert effectué avec succès.')) {
            const message = `Le transfert effectué par ${(_a = result.emetteur) === null || _a === void 0 ? void 0 : _a.nom} vers ${(_b = result.beneficiaire) === null || _b === void 0 ? void 0 : _b.nom} est un succès.`;
            notification(message);
        }
    })
        .catch(error => console.error('Erreur lors du transfert:', error));
}
const boutonValider = document.querySelector('.btn-primary');
boutonValider === null || boutonValider === void 0 ? void 0 : boutonValider.addEventListener('click', transfert);
(_a = document.getElementById('expediteur')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
    const expediteur = document.getElementById('expediteur').value;
    fetch('http://127.0.0.1:8000/api/getclient/' + expediteur)
        .then(response => response.json())
        .then((result) => {
        if (result.nom) {
            document.getElementById('expediteur_nom').value = result.nom;
        }
        else {
            document.getElementById('expediteur_nom').value = '';
        }
    })
        .catch(error => console.error('Erreur lors de la récupération du nom de l\'expéditeur:', error));
});
(_b = document.getElementById('destinataire')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', () => {
    const destinataire = document.getElementById('destinataire').value;
    fetch('http://127.0.0.1:8000/api/getclient/' + destinataire)
        .then(response => response.json())
        .then((result) => {
        if (result.nom) {
            document.getElementById('destinataire_nom').value = result.nom;
        }
        else {
            document.getElementById('destinataire_nom').value = '';
        }
    })
        .catch(error => console.error('Erreur lors de la récupération du nom du destinataire:', error));
});
function showNotification(message) {
    console.log('showNotification function called.');
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(message);
    }
}
let container = document.querySelector('.container');
function notification(text) {
    let notifi = document.createElement("div");
    notifi.textContent = text;
    notifi.classList.add("notification");
    container.appendChild(notifi);
    setTimeout(() => {
        container.removeChild(notifi);
    }, 3000);
}
(_c = document.getElementById('fournisseur')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', () => {
    const selectElement = document.getElementById('fournisseur');
    const transactionTitles = document.querySelectorAll('.transaction-title');
    const selectedFournisseur = selectElement.value;
    transactionTitles.forEach(transactionTitle => {
        transactionTitle.classList.remove('om', 'wave', 'wari', 'cb');
        if (selectedFournisseur === 'om') {
            transactionTitle.classList.add('om');
        }
        else if (selectedFournisseur === 'wave') {
            transactionTitle.classList.add('wave');
        }
        else if (selectedFournisseur === 'wari') {
            transactionTitle.classList.add('wari');
        }
        else if (selectedFournisseur === 'cb') {
            transactionTitle.classList.add('cb');
        }
    });
});
