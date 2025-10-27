function CreateCard(
  id,
  productName,
  productPrice,
  category,
  descraption,
  imageURL
) {
  var col = document.createElement("div");
  col.classList.add("col");
  var card = document.createElement("div");
  card.classList.add("card");

  col.append(card);

  var img = document.createElement("img");
  img.src = imageURL;
  img.classList = "card-img-top";
  img.alt = "product image";

  card.append(img);

  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  var headerProductName = document.createElement("h5");
  headerProductName.textContent = productName;
  headerProductName.classList.add("card-title");
  cardBody.append(headerProductName);

  var headerPrice = document.createElement("h6");
  headerPrice.textContent = `Price: ${productPrice}$`;
  headerPrice.classList.add("card-title");
  cardBody.append(headerPrice);

  var headerCategoryName = document.createElement("h6");
  headerCategoryName.textContent = `Category: ${category}`;
  headerCategoryName.classList.add("card-title");
  cardBody.append(headerCategoryName);

  var productDescraption = document.createElement("p");
  productDescraption.textContent = descraption;
  productDescraption.classList.add("card-text");
  cardBody.append(productDescraption);

  card.append(cardBody);

  var actionsBtns = document.createElement("div");
  actionsBtns.classList.add(
    "actions-btns",
    "d-flex",
    "flex-wrap",
    "justify-content-center",
    "pb-3",
    "gap-3",
    "card-footer"
  );
  card.append(actionsBtns);

  var btnUpdate = document.createElement("button");
  btnUpdate.classList.add("btn", "btn-warning");
  var iconUpdate = document.createElement("i");
  iconUpdate.classList.add("fa-solid", "fa-edit");
  btnUpdate.append(iconUpdate, "Edit");
  btnUpdate.addEventListener("click", function () {
    updateProduct(id);
  });
  actionsBtns.append(btnUpdate);

  var btnDelete = document.createElement("button");
  btnDelete.classList.add("btn", "btn-danger");
  var iconDelete = document.createElement("i");
  iconDelete.classList.add("fa-solid", "fa-trash");
  btnDelete.append(iconDelete, "Delete");

  btnDelete.addEventListener("click", function () {
    deleteProduct(id);
  });

  actionsBtns.append(btnDelete);

  return col;
}

function clearInput() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDiscraptionInput.value = null;
  productImageInput.value = null;
}

function clearContainer() {
  var arrayOfCol = Array.from(container.childNodes);
  for (var i = 0; i < arrayOfCol.length; i++) {
    arrayOfCol[i].remove();
  }
}

function isValid(input) {
  var productRegex = {
    productName: /^[A-Za-z0-9\s]{2,50}$/,
    productPrice: /^[1-9]\d{0,6}(\.\d{1,2})?$/,
    productDiscraption: /^[A-Za-z0-9\s.,!?'"":;()\-\r\n]{3,200}$/,
    productCategory: /^[1-9][0-9]{0,3}$/,
  };
  if (productRegex[input.id].test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}
