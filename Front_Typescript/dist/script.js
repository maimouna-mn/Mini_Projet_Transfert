var _a, _b, _c;
(_a = document.getElementById('fournisseur')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
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
// function transfert() {
//     const montant = (<HTMLInputElement>document.getElementById('montant')).value;
//     const expediteur = (<HTMLInputElement>document.getElementById('expediteur')).value;
//     const destinataire = (<HTMLInputElement>document.getElementById('destinataire')).value;
//     const data = {
//       montant: montant,
//       id_emetteur: expediteur,
//       id_beneficiaire: destinataire,
//     };
//     fetch('http://127.0.0.1:8000/api/transferts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//       console.log(result.message);
//       if (result.codeRetrait) {
//         console.log('Code de retrait: ' + result.codeRetrait);
//       }
//     })
//     .catch(error => console.error('Erreur lors du transfert:', error));
//   }
//   const boutonValider = document.querySelector('.btn-primary');
//   boutonValider.addEventListener('click', transfert);
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
        console.log(result.message);
        if (result.codeRetrait) {
            console.log('Code de retrait: ' + result.codeRetrait);
        }
        // Fill in the Nom input fields for expediteur and destinataire
        if (result.emetteur) {
            document.getElementById('expediteur_nom').value = result.emetteur.nom;
        }
        if (result.beneficiaire) {
            document.getElementById('destinataire_nom').value = result.beneficiaire.nom;
        }
    })
        .catch(error => console.error('Erreur lors du transfert:', error));
}
const boutonValider = document.querySelector('.btn-primary');
boutonValider === null || boutonValider === void 0 ? void 0 : boutonValider.addEventListener('click', transfert);
// Event listener for "Numéro expéditeur" field
(_b = document.getElementById('expediteur')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', () => {
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
// Event listener for "Numéro destinataire" field
(_c = document.getElementById('destinataire')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', () => {
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
