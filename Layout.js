window.addEventListener("load", () => {
  //Acquiring input parameters from input form//

  const params = new URL(document.location).searchParams;
  const standardRows = params.get("StandardRows");
  const standardColumns = params.get("StandardColumns");
  const premiumRows = params.get("PremiumRows");
  const premiumColumns = params.get("PremiumColumns");

  // All the variables we need//

  const standardContaniner = document.getElementById("sseats");
  const premiumContaniner = document.getElementById("pseats");
  var quantitySeat = document.getElementById("seatnumber");
  var seatType = document.getElementById("seatype");
  var proceedButton = document.getElementById("proceed");
  var count1 = 0;
  var count2 = premiumRows;
  var idCount1 = 0;
  var idCount2 = 0;
  var temArr = [];
  var globalQuantitySeat;
  var isPremium;
  var isStandard;

  const ALPHA = Array.from(Array(26)).map((e, i) => i + 65);
  const ALPHABETS = ALPHA.map((x) => String.fromCharCode(x));

  //Rendering seats from input here//

  CreateBox(
    premiumRows,
    premiumColumns,
    premiumContaniner,
    count1,
    "pbox",
    idCount1
  );
  CreateBox(
    standardRows,
    standardColumns,
    standardContaniner,
    count2,
    "sbox",
    idCount2
  );

  var totalPSeat = document.querySelectorAll(".pbox.available:not(.blocked)");
  console.log(totalPSeat);
  var pSeatArray = Array.from(totalPSeat);
  var totalPSeatLength = totalPSeat.length;
  var totalSSeat = document.querySelectorAll(".sbox");
  var sSeatArray = Array.from(totalSSeat);
  var totalSSeatLength = totalSSeat.length;
  showLocallyStoredData1(totalPSeat);
  showLocallyStoredData2(totalSSeat);
  var blockedPSeatLength = document.querySelectorAll(".pbox.blocked").length;
  var blockedSeatLength = document.querySelectorAll(".sbox.blocked").length;

  //Obtaining seattype and seatQuantity here//

  quantitySeat.addEventListener("change", (e) => {
    e.preventDefault();
    globalQuantitySeat = parseInt(e.target.value);
  });

  seatType.addEventListener("change", (e) => {
    e.preventDefault();
    globalSeatType = e.currentTarget.value;
    console.log(globalSeatType);
    callBack()
    debugger;
  });
  function callBack(){
      if (globalSeatType === "premium" && globalSeatType != 'standard') {
    for (let t = 0; t < temArr.length; t++) {
      sSeatArray[temArr[t]].classList.remove("selected");
    }
    temArr = [];
    // window.location.reload();

    fun_Seat_Select1(totalPSeat);
    if (totalPSeatLength == blockedPSeatLength) {
      alert("Premium seats are fully booked.");
      window.location.reload();
    }
      } else if (globalSeatType === "standard" && globalSeatType != "premium") {
    for (let t = 0; t < temArr.length; t++) {
      pSeatArray[temArr[t]].classList.remove("selected");
    }
    temArr = [];
    fun_Seat_Select2(totalSSeat);
    if (totalSSeatLength == blockedSeatLength) {
      alert("Standard seats are fully booked.");
      window.location.reload();
    }
      }
  }

  // Function to create the seats dynamically//

  function CreateBox(inputdata1, inputdata2, container, k, boxtype, idCount) {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < inputdata1; i++) {
      const row = document.createElement("tr");
      const td2 = document.createElement("td");
      row.className = "trclass";
      td2.className = "td2class";
      td2.innerText = ALPHABETS[k];
      row.appendChild(td2);
      k++;
      for (let j = 0; j < inputdata2; j++) {
        idCount++;
        const td1 = document.createElement("td");
        td1.className = "tdclass";
        const cellText = document.createTextNode(j + 1);
        var div1 = document.createElement("div");
        div1.className = `${boxtype} available`;
        div1.id = `${idCount}`;
        div1.appendChild(cellText);
        td1.appendChild(div1);
        row.appendChild(td1);
        tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
      container.appendChild(tbl);
    }
  }

  // Main Seat Select Function//

  function fun_Seat_Select1(seatsByClassNodeList) {
    var seatsByClass = Array.from(seatsByClassNodeList);
    console.log(seatsByClassNodeList);
    for (let i = 0; i <=seatsByClass.length; i++) {
      seatsByClass[i].addEventListener("click", (e) => {
        console.log("clicked!", e.target.id);
        var idValue = parseInt(e.target.id);

        if (temArr.length != globalQuantitySeat) {
          inside_Fun_Seat_Select(idValue, seatsByClass);
        } else {
          console.log("entered");
          for (let t = 0; t < temArr.length; t++) {
            seatsByClass[temArr[t]].classList.remove("selected");
          }
          temArr = [];
          inside_Fun_Seat_Select(idValue, seatsByClass);
        }
        proceedButton.addEventListener("click", proceedFun);
        function proceedFun() {
          if (globalSeatType === "premium") {
            storeConfirmedPremiumSeats(seatsByClassNodeList);
          }
          if (globalSeatType === "standard") {
            storeConfirmedStandardSeats(seatsByClassNodeList);
          }
          console.log("clicked");
          window.location.reload();
        }
        console.log(temArr);
      });
    }
  }

  function fun_Seat_Select2(seatsByClassNodeList) {
    var seatsByClass = Array.from(seatsByClassNodeList);
    console.log(seatsByClassNodeList);
    for (let i = 0; i < seatsByClass.length; i++) {
      seatsByClass[i].addEventListener("click", (e) => {
        console.log("clicked!", e.target.id);
        var idValue = parseInt(e.target.id);

        if (temArr.length != globalQuantitySeat) {
          inside_Fun_Seat_Select(idValue, seatsByClass);
        } else {
          console.log("entered");
          for (let t = 0; t < temArr.length; t++) {
            seatsByClass[temArr[t]].classList.remove("selected");
          }
          temArr = [];
          inside_Fun_Seat_Select(idValue, seatsByClass);
        }
        proceedButton.addEventListener("click", proceedFun);
        function proceedFun() {
          if (globalSeatType === "premium") {
            storeConfirmedPremiumSeats(seatsByClassNodeList);
          }
          if (globalSeatType === "standard") {
            storeConfirmedStandardSeats(seatsByClassNodeList);
          }
          //   else{
          //       alert('please select seats.')
          //   }
          console.log("clicked");
          window.location.reload();
        }
        console.log(temArr);
      });
    }
  }

  // Function inside of Main Function//

  function inside_Fun_Seat_Select(idValue, seatsByClass) {
    for (let j = 0; j < globalQuantitySeat; j++) {
      temArr.push(idValue + j - 1);
      console.log("pushed");
      // debugger;
    }
    for (let k = 0; k < temArr.length; k++) {
      seatsByClass[temArr[k]].classList.add("selected");
      console.log("selected!");
    }
  }
  // Local Storage Starts here//
  //Premium Selected Seats Stored here//

  function storeConfirmedPremiumSeats(seatsByClassNodeList) {
    const selectedSeats = document.querySelectorAll(".selected");
    const blockedSeats = document.querySelectorAll(".blocked");
    console.log(blockedSeats);
    const indexOfBlockedSeats = [...blockedSeats].map((seat) =>
      [...seatsByClassNodeList].indexOf(seat)
    );
    const indexOfSelectSeats = [...selectedSeats].map((seat) =>
      [...seatsByClassNodeList].indexOf(seat)
    );
    const concatedArrayOfSeats = indexOfBlockedSeats.concat(indexOfSelectSeats);
    localStorage.setItem(
      "selectedPremiumSeats",
      JSON.stringify(concatedArrayOfSeats)
    );
  }

  function showLocallyStoredData1(seatsByClassNodeList) {
    const selectedSeats = JSON.parse(
      localStorage.getItem("selectedPremiumSeats")
    );
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seatsByClassNodeList.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) >= 0) {
          seat.classList.add("blocked");
        }
      });
    }
  }

  //Standard Selected Seats Stored here//

  function storeConfirmedStandardSeats(seatsByClassNodeList) {
    const selectedSeats = document.querySelectorAll(".selected");
    const blockedSeats = document.querySelectorAll(".blocked");
    console.log(blockedSeats);
    const indexOfBlockedSeats = [...blockedSeats].map((seat) =>
      [...seatsByClassNodeList].indexOf(seat)
    );
    const indexOfSelectSeats = [...selectedSeats].map((seat) =>
      [...seatsByClassNodeList].indexOf(seat)
    );
    const concatedArrayOfSeats = indexOfBlockedSeats.concat(indexOfSelectSeats);
    localStorage.setItem(
      "selectedStandardSeats",
      JSON.stringify(concatedArrayOfSeats)
    );
  }

  function showLocallyStoredData2(seatsByClassNodeList) {
    const selectedSeats = JSON.parse(
      localStorage.getItem("selectedStandardSeats")
    );
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seatsByClassNodeList.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) >= 0) {
          seat.classList.add("blocked");
        }
      });
    }
  }
  //Local Storage Ends here//
});
