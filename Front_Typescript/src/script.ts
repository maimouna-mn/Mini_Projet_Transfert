document.getElementById('fournisseur')?.addEventListener('change', () => {
    const selectElement = document.getElementById('fournisseur') as HTMLSelectElement;
    const transactionTitles = document.querySelectorAll('.transaction-title') as NodeListOf<HTMLHeadingElement>;
    const selectedFournisseur = selectElement.value;

    transactionTitles.forEach(transactionTitle => {
        transactionTitle.classList.remove('om', 'wave', 'wari', 'cb');
        
        if (selectedFournisseur === 'om') {
            transactionTitle.classList.add('om');
        } else if (selectedFournisseur === 'wave') {
            transactionTitle.classList.add('wave');
        } else if (selectedFournisseur === 'wari') {
            transactionTitle.classList.add('wari');
        } else if (selectedFournisseur === 'cb') {
            transactionTitle.classList.add('cb');
        }
    });
});



function transfert() {
    const montant = (<HTMLInputElement>document.getElementById('montant')).value;
    const expediteur = (<HTMLInputElement>document.getElementById('expediteur')).value;
    const destinataire = (<HTMLInputElement>document.getElementById('destinataire')).value;
  
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
      .then((result: any) => {
        console.log(result.message);
        if (result.codeRetrait) {
          console.log('Code de retrait: ' + result.codeRetrait);
        }
  
        if (result.emetteur) {
          (<HTMLInputElement>document.getElementById('expediteur_nom')).value = result.emetteur.nom;
        }
  
        if (result.beneficiaire) {
          (<HTMLInputElement>document.getElementById('destinataire_nom')).value = result.beneficiaire.nom;
        }
      })
      .catch(error => console.error('Erreur lors du transfert:', error));
  }
  
  const boutonValider = document.querySelector('.btn-primary');
  boutonValider?.addEventListener('click', transfert);
  
  document.getElementById('expediteur')?.addEventListener('change', () => {
    const expediteur = (<HTMLInputElement>document.getElementById('expediteur')).value;
    fetch('http://127.0.0.1:8000/api/getclient/' + expediteur)
      .then(response => response.json())
      .then((result: any) => {
        if (result.nom) {
          (<HTMLInputElement>document.getElementById('expediteur_nom')).value = result.nom;
        } else {
          (<HTMLInputElement>document.getElementById('expediteur_nom')).value = '';
        }
      })
      .catch(error => console.error('Erreur lors de la récupération du nom de l\'expéditeur:', error));
  });
  
  document.getElementById('destinataire')?.addEventListener('change', () => {
    const destinataire = (<HTMLInputElement>document.getElementById('destinataire')).value;
    fetch('http://127.0.0.1:8000/api/getclient/' + destinataire)
      .then(response => response.json())
      .then((result: any) => {
        if (result.nom) {
          (<HTMLInputElement>document.getElementById('destinataire_nom')).value = result.nom;
        } else {
          (<HTMLInputElement>document.getElementById('destinataire_nom')).value = '';
        }
      })
      .catch(error => console.error('Erreur lors de la récupération du nom du destinataire:', error));
  });
  