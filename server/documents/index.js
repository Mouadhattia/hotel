import moment from "moment";

export default function ({
  name,
  address,
  phone,
  email,
  dueDate,
  date,
  id,
  notes,
  subTotal,
  vat,
  fodee,
  dsht,
  total,
  items,
  status,
  totalAmountReceived,
  balanceDue,
  company,
}) {
  const today = new Date();
  return `
<!DOCTYPE html>
<html>
<head>
<style>

.invoice-container {
    margin: 0;
    padding: 0;
    padding-top: 10px;
    font-family: 'Roboto', sans-serif;
    width: 530px;
    margin: 0px auto;
    }

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid rgb(247, 247, 247);
  padding: 10px;
}

table tr:nth-child(even){background-color: #f8f8f8;}

table tr:hover {background-color: rgb(243, 243, 243);}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFFFF;
  color: rgb(78, 78, 78);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    

}
.address {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0px 15px 0px;
    line-height: 10px;
    font-size: 12px;
    margin-top: -20px

}

.status {
    text-align: right;
}
.receipt-id {
    text-align: right;
}

.title {
    font-weight: 100px;
    text-transform: uppercase;
    color: gray;
    letter-spacing: 2px;
    font-size: 8px;
    line-height: 5px;
}

.summary {
    margin-top: 2px;
    margin-right: 0px;
    margin-left: 50%;
    margin-bottom: 15px;
}

img {
    width: 100px;
   
}

</style>
</head>
<body>
<div class="invoice-container">
<section  class="header" >
        <div>
          ${company.logo ? `<img src=${company?.logo} />` : `<h2>___</h2>`}
        </div>
        <div style="margin-bottom: 50px; margin-top: 20px ; height:60px" >
        ${
          company.paymentDetails
            ? `<p style="font-size: 9px; line-height: 5px">  ${company?.paymentDetails} </p>`
            : `<h2>___</h2>`
        }
        </div>
</section>
<section class="address">

      <div>
          <p class="title">Depuis</p>
          <h4 style="font-size: 9px; line-height: 5px">${
            company.businessName ? company.businessName : company.name
          }</h4>
          <p style="font-size: 9px; line-height: 5px">${company.email}</p>
          <p style="font-size: 9px; line-height: 5px">${company.phoneNumber}</p>
          <p style="font-size: 9px; line-height: 5px">${
            company.contactAddress
          }</p>
      </div>

      <div style="margin-bottom: 100px; margin-top: 20px">
      <p class="title">facturer:</p>
        <h4 style="font-size: 9px; line-height: 5px">${name}</h4>
        <p style="font-size: 9px; line-height: 5px">${email}</p>
        <p style="font-size: 9px; line-height: 5px">${phone}</p>
        <p style="font-size: 9px; line-height: 5px">${address}</p>
      </div>

    <div class="status" style="margin-top: -280px">
        <h1 style="font-size: 12px">${
          Number(balanceDue) <= 0 ? "Re??u" : "Facture"
        }</h1>
        <p style="font-size: 8px; margin-bottom: 10px">${id}</p>
        <p class="title" style="font-size: 8px">Statut</p>
        <h3 style="font-size: 12px">${status}</h3>
        <p class="title" style="font-size: 8px">Date</p>
        <p  style="font-size: 9px" >${moment(date).format("ll")}</p>
        <p class="title"  style="font-size: 8px">Date d'??ch??ance</p>
        <p  style="font-size: 9px">${moment(dueDate).format("ll")}</p>
        <p class="title"  style="font-size: 8px">Total TTC</p>
        <h3 style="font-size: 12px">${total}</h3>
    </div>
</section>

<table>
  <tr>
    <th style="font-size: 9px">DESIGNATIONS</th>
    <th style="font-size: 9px">Person</th>
    <th style="font-size: 9px">Nuit??es</th>
    <th style="font-size: 9px">P.U.H.T</th>

    <th style="text-align: right; font-size: 9px">Montant-HT</th>
  </tr>

  ${items.map(
    (item) =>
      `  <tr>
    <td style="font-size: 9px">${item.itemName}</td>
    <td style="font-size: 9px">${item.person}</td>
    <td style="font-size: 9px">${item.quantity}</td>
    <td style="font-size: 9px">${item.unitPrice}</td>
    
    <td style="text-align: right; font-size: 9px">${
      item.quantity * item.unitPrice -
      (item.quantity * item.unitPrice * item.discount) / 100
    }</td>
  </tr>`
  )}


</table>

<section class="summary">
    <table>
        <tr>
          <th style="font-size: 9px">R??sum?? de la facture</th>
          <th></th>
        </tr>
        <tr>
          <td style="font-size: 9px">Sous-total</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${subTotal}</td>
        </tr>
        <tr>
        <td style="font-size: 10px">Fodee</td>
        <td style="text-align: right; font-size: 9px; font-weight: 700">${fodee}</td>
          </tr>
        <tr>
            <td style="font-size: 10px">VAT</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${vat}</td>
          </tr>
          <tr>
          <td style="font-size: 10px">D.Timbre</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">0.6</td>
        </tr>
        <tr>
            <td style="font-size: 10px">D.S.H.T</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${dsht}</td>
          </tr>
        <tr>
            <td style="font-size: 10px">Total</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${total}</td>
          </tr>

        <tr>
            <td style="font-size: 10px" >Pay??</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${totalAmountReceived}</td>
          </tr>

          <tr>
          <td style="font-size: 9px">Rest</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${balanceDue}</td>
        </tr>
        
      </table>
  </section>
  <div>
      <hr>
      <h4 style="font-size: 9px">Arr??te la pr??sente facture ?? la somme de</h4>
      <p style="font-size: 9px">${notes}</p>
  </div>
</div>
</body>
</html>`;
}
