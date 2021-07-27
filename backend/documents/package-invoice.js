module.exports = ({
  title,
  type,
  numberOfWorks,
  category,
  fee,
  phone,
  receiptNo,
  days,
  hirer,
  worker,
  discount,
  masonry,
  carpentry,
  house_wiring,
  plumber,
  painting,
  total,
}) => {
  const today = new Date();
  carpentryFee = carpentry ? parseFloat(carpentry.fee) : 0;
  house_wiringFee = house_wiring ? parseFloat(house_wiring.fee) : 0;
  masonryFee = masonry ? parseFloat(masonry.fee) : 0;
  plumberFee = plumber ? parseFloat(plumber.fee) : 0;
  paintingFee = painting ? parseFloat(painting.fee) : 0;
  console.log(
    carpentryFee,
    house_wiringFee,
    masonryFee,
    plumberFee,
    paintingFee
  );
  total =
    masonryFee + carpentryFee + house_wiringFee + plumberFee + paintingFee;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <!--  This file has been downloaded from https://bootdey.com  -->
    <!--  All snippets are MIT license https://bootdey.com/license -->
    <title>Bootdey.com</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
        /* -------------------------------------
    GLOBAL
    A very basic CSS reset
------------------------------------- */
* {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    font-size: 14px;
}

img {
    max-width: 100%;
}

body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100% !important;
    height: 100%;
    line-height: 1.6;
}

/* Let's make sure all tables have defaults */
table td {
    vertical-align: top;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
body {
    background-color: #f6f6f6;
}

.body-wrap {
    background-color: #f6f6f6;
    width: 100%;
}

.container {
    display: block !important;
    max-width: 600px !important;
    margin: 0 auto !important;
    /* makes it centered */
    clear: both !important;
}

.content {
    max-width: 600px;
    margin: 0 auto;
    display: block;
    padding: 20px;
}

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
}

.content-wrap {
    padding: 20px;
}

.content-block {
    padding: 0 0 20px;
}

.header {
    width: 100%;
    margin-bottom: 20px;
}

.footer {
    width: 100%;
    clear: both;
    color: #999;
    padding: 20px;
}
.footer a {
    color: #999;
}
.footer p, .footer a, .footer unsubscribe, .footer td {
    font-size: 12px;
}

/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    color: #000;
    margin: 40px 0 0;
    line-height: 1.2;
    font-weight: 400;
}

h1 {
    font-size: 32px;
    font-weight: 500;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 18px;
}

h4 {
    font-size: 14px;
    font-weight: 600;
}

p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
}
p li, ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
}

/* -------------------------------------
    LINKS & BUTTONS
------------------------------------- */
a {
    color: #1ab394;
    text-decoration: underline;
}

.btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #1ab394;
    border: solid #1ab394;
    border-width: 5px 10px;
    line-height: 2;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    text-transform: capitalize;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.aligncenter {
    text-align: center;
}

.alignright {
    text-align: right;
}

.alignleft {
    text-align: left;
}

.clear {
    clear: both;
}

/* -------------------------------------
    ALERTS
    Change the class depending on warning email, good email or bad email
------------------------------------- */
.alert {
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 20px;
    text-align: center;
    border-radius: 3px 3px 0 0;
}
.alert a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
}
.alert.alert-warning {
    background: #f8ac59;
}
.alert.alert-bad {
    background: #ed5565;
}
.alert.alert-good {
    background: #1ab394;
}

/* -------------------------------------
    INVOICE
    Styles for the billing table
------------------------------------- */
.invoice {
    margin: 40px auto;
    text-align: left;
    width: 80%;
}
.invoice td {
    padding: 5px 0;
}
.invoice .invoice-items {
    width: 100%;
}
.invoice .invoice-items td {
    border-top: #eee 1px solid;
}
.invoice .invoice-items .total td {
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    font-weight: 700;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 640px) {
    h1, h2, h3, h4 {
        font-weight: 600 !important;
        margin: 20px 0 5px !important;
    }

    h1 {
        font-size: 22px !important;
    }

    h2 {
        font-size: 18px !important;
    }

    h3 {
        font-size: 16px !important;
    }

    .container {
        width: 100% !important;
    }

    .content, .content-wrap {
        padding: 10px !important;
    }

    .invoice {
        width: 100% !important;
    }
}

    </style>
</head>
<body>
<table class="body-wrap">
    <tbody><tr>
        <td></td>
        <td class="container" width="600">
            <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td class="content-wrap aligncenter">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td class="content-block">
                                    <img src="https://i.imgur.com/aPbTOCL.png" width="100px" height="auto"></img>
                                        <h2>${title}</h2>
                                       
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block">
                                        <table class="invoice">
                                            <tbody><tr>
                                                <td>Package Type : Normal<br>Works included - ${
                                                  type === "Normal"
                                                    ? 3
                                                    : type === "Elite"
                                                    ? 4 // else if
                                                    : type === "Premium"
                                                    ? 5
                                                    : 0
                                                }<br>Reference No #100123<br>${`${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                                                        <tbody>
                                                        <tr>
                                                            <td>Work 1 - [${
                                                              masonry
                                                                ? masonry.category
                                                                : ""
                                                            }] - Charges(per day)</td>
                                                            <td class="alignright">LKR ${
                                                              masonry
                                                                ? masonry.fee
                                                                : 0
                                                            }</td>
                                                        </tr>
                                                        <tr>
                                                          <td>Work 2 - [${
                                                            carpentry
                                                              ? carpentry.category
                                                              : ""
                                                          }] - Charges(per day)</td>
                                                          <td class="alignright">LKR ${
                                                            carpentry
                                                              ? carpentry.fee
                                                              : 0
                                                          } </td>
                                                      </tr>
                                                      <tr>
                                                          <td>Work 3 - [${
                                                            plumber
                                                              ? plumber.category
                                                              : ""
                                                          }] - Charges(per day)</td>
                                                          <td class="alignright">LKR ${
                                                            plumber
                                                              ? plumber.fee
                                                              : 0
                                                          }</td>
                                                      </tr>
                                                      <tr>
                                                        <td>Work 4 - [${
                                                          house_wiring
                                                            ? house_wiring.category
                                                            : ""
                                                        }] - Charges(per day)</td>
                                                        <td class="alignright">LKR ${
                                                          house_wiring
                                                            ? house_wiring.fee
                                                            : 0
                                                        }</td>
                                                      </tr>
                                                      <tr>
                                                        <td>Work 5 - [${
                                                          painting
                                                            ? painting.category
                                                            : ""
                                                        }] - Charges(per day)</td>
                                                        <td class="alignright">LKR ${
                                                          painting
                                                            ? painting.fee
                                                            : 0
                                                        }</td>
                                                      </tr>
                                                        <tr>
                                                            <td>Days</td>
                                                            <td class="alignright">7</td>
                                                        </tr>
                                                      <tr>
                                                          <td >Total</td>
                                                          <td class="alignright">LKR ${total}</td>
                                                      </tr>
                                                      <tr>
                                                          <td>Discount(%)</td>
                                                          <td class="alignright">${discount}</td>
                                                      </tr>
                                                      <tr>
                                                          <td>Discount Price</td>
                                                          <td class="alignright">${
                                                            (total / 100) *
                                                            discount
                                                          }</td>
                                                      </tr>
                                                        <tr class="total">
                                                            <td  width="80%">Total Price</td>
                                                            <td class="alignright">LKR ${
                                                              total -
                                                              (total / 100) *
                                                                discount
                                                            }</td>
                                                        </tr>
                                                    </tbody></table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                   
                                <tr>
                                    <td class="content-block">
                                        Niwahana | A Construction Services Web Platform
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div class="footer">
                    <table width="100%">
                        <tbody><tr>
                            <td class="aligncenter content-block">Questions? Email <a href="/">support@niwahana.lk</a></td>
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>

<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript">
    
</script>
</body>
</html>
`;
};
