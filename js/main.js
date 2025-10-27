var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDiscraptionInput = document.getElementById("productDiscraption");
var productImageInput = document.getElementById("productImage");

var updateProductButton = document.getElementById("updateProductBtn");
var deleteProductButton = document.getElementById("deleteProductBtn");
var createProductButton = document.getElementById("CreateProductBtn");

var container = document.getElementById("product-container");

var productSearchInput = document.getElementById("productSearch");

var currentId;

display();

// ======================================== Initiate Category List ============================================= //
ListOfCategory();

async function ListOfCategory() {
  try {
    var res = await fetch(
      "https://route-cruds.runasp.net/api/Category/GetCategoryList"
    );
    var allData = await res.json();
    var data = allData.data;

    for (var i = 0; i < data.length; i++) {
      var option = document.createElement("option");
      option.value = data[i].id;
      option.textContent = data[i].name;
      productCategoryInput.append(option);
    }
  } catch (ex) {
    console.log(`Something is going wrong ${ex}`);
  }
}

// ======================================== Create Product ============================================= //
createProductButton.addEventListener("click", function () {
  addProduct();
});

async function addProduct() {
  if (
    isValid(productNameInput) &&
    isValid(productPriceInput) &&
    isValid(productCategoryInput) &&
    isValid(productDiscraptionInput) &&
    productImageInput.files.length > 0
  ) {
    try {
      var formData = new FormData();
      formData.append("ProductName", productNameInput.value);
      formData.append("ProductPrice", productPriceInput.value);
      formData.append("ProductCategoryId", productCategoryInput.value);
      formData.append("ProductDescription", productDiscraptionInput.value);
      formData.append("Image", productImageInput.files[0]);

      var res = await fetch(
        "https://route-cruds.runasp.net/api/Product/CreateNewProduct",
        {
          method: "POST",
          body: formData,
        }
      );
      // var allData = await res.json();
      clearContainer();
      await display();
      clearInput();
    } catch (ex) {
      console.log(`Something is going wrong ${ex}`);
    }
  } else {
    Swal.fire("SweetAlert2 is working!");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please insert valid data!",
    });
  }
}

// ======================================== Read Product ============================================= //
async function display() {
  try {
    var send = await fetch(
      "https://route-cruds.runasp.net/api/Product/GetAllProducts"
    );
    var response = await send.json();
    var products = response.data;
    for (var i = 0; i < products.length; i++) {
      container.append(
        CreateCard(
          products[i].id,
          products[i].productName,
          products[i].productPrice,
          products[i].productCategory,
          products[i].productDescription,
          products[i].imageURL
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// ================================Searching ================================ //
productSearchInput.addEventListener("input", async function () {
  if (productSearchInput.value == "") {
    clearContainer();
    display();
  } else {
    await productSearch(productSearchInput.value);
  }
});

async function productSearch(productName) {
  try {
    var send = await fetch(
      `https://route-cruds.runasp.net/api/Product/SearchByProductName/${productName}`
    );
    var response = await send.json();
    if (response.succeeded) {
      var products = response.data;
      clearContainer();
      for (var i = 0; i < products.length; i++) {
        container.append(
          CreateCard(
            products[i].id,
            products[i].productName,
            products[i].productPrice,
            products[i].productCategory,
            products[i].productDescription,
            products[i].imageURL
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// ======================================== Delete Product ============================================= //
async function deleteProduct(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const send = await fetch(
          `https://route-cruds.runasp.net/api/Product/DeleteProduct/${id}`,
          { method: "DELETE" }
        );

        if (send.ok) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          clearContainer();
          display();
        } else {
          Swal.fire("Error!", "Failed to delete the product.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  });
}

// ======================================== Update Product ============================================= //
async function updateProduct(id) {
  var sending = await fetch(
    `https://route-cruds.runasp.net/api/Product/GetProductById/${id}`
  );
  var response = await sending.json();
  if (response.succeeded) {
    var data = response.data;
    productNameInput.value = data.productName;
    productPriceInput.value = data.productPrice;
    productCategoryInput.value = data.productCategory;
    productDiscraptionInput.value = data.productDescription;
  }
  updateProductButton.classList.remove("d-none");
  createProductButton.classList.add("d-none");
  currentId = id;
}
updateProductButton.addEventListener("click", function () {
  editProduct();
});

async function editProduct() {
  if (
    isValid(productNameInput) &&
    isValid(productPriceInput) &&
    isValid(productCategoryInput) &&
    isValid(productDiscraptionInput)
  ) {
    try {
      var formData = new FormData();
      formData.append("Id", currentId);
      formData.append("ProductName", productNameInput.value);
      formData.append("ProductPrice", productPriceInput.value);
      formData.append("ProductCategoryId", productCategoryInput.value);
      formData.append("ProductDescription", productDiscraptionInput.value);
      formData.append("Image", productImageInput.files[0]);

      var res = await fetch(
        "https://route-cruds.runasp.net/api/Product/UpdateProduct",
        {
          method: "PUT",
          body: formData,
        }
      );
      // var allData = await res.json();
      clearContainer();
      updateProductButton.classList.add("d-none");
      createProductButton.classList.remove("d-none");
      await display();
      clearInput();
    } catch (ex) {
      console.log(`Something is going wrong ${ex}`);
    }
  }else{
     Swal.fire("SweetAlert2 is working!");
     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: "Please insert valid data!",
     });
  }
}
