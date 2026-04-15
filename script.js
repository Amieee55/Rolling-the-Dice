"use strict"; //Strict Mode
//Note to self '' and `` are differnet 

async function getAllRecords(){ //function for Event List
    let container = document.getElementById("eventList");

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer patUZbjIH5L5eCO0M.db444e26deda63327d01fc6935a4c9684143302e300bf49447dbf8f9a5cc395d`, //${secrets.API_KEY}
        },
    };
    const response = await fetch(
        `https://api.airtable.com/v0/appx3kAqDzfrdw6NC/Respawn%20Point?returnFieldsByFieldId=true`,
        options
    );
    const data = await response.json();

    console.log(data); //see Airtable data

    data.records.forEach(record => {
        let fields = record.fields;

//-- HTML code for Event Card --
        let card = `
<div class="cardEvent card d-flex" id="${record.id}">
    <div class="top-Card">  <!--Top Section-->
        <div class="eventName d-flex flex-row">
            <p>${fields["fldQyz4DI6To3rQlZ"]}</p>
        </div> 
        <div class="imageType">
        <img src="${fields["fld2mASM3OlRq1LFD"]?.[0]?.url}" alt="Trading Card type of game ${fields["fldQyz4DI6To3rQlZ"]}">
        </div>
    </div>
    <div class="middlePhoto"> <!--Middle-->
        <img class="text-center" src="${fields["fldEwehoiY9W0QY9E"]?.[0]?.url}" alt="${fields["fldQyz4DI6To3rQlZ"]}" width="300px">
    </div>
    <div class="eventDate">
        <p>${fields["fldXlmyk1BD64LcO3"]}</p>
    </div>
    <div class="bottom-Card"> <!--Bottom Section-->
        <p class="location">${fields["fld1pwJCzozb4VoER"]}</p>
        <p class="eventDetails">${fields["fldF3ia1FtzBEHzpJ"]}</p>
        <p class="contact">${fields["fldQoskto8g5AxIdN"]}</p>
        <div class="pillSection">
            <div class="feeCard text-center">
                <p class="text-center"><u>FEE</u><br> ${fields["fldSsH3vAB2X1ZQ7e"]}</p>
            </div>
            <div class="prizeCard text-center">
                <p><u>Prize</u><br>${fields["fldcjXvUlXncBQLer"]}</p>
            </div>
        </div>
    </div>
  </div>
</div>
        `;
        container.innerHTML += card;
    });
}

//getAllRecords();

async function iconView(){
    let container = document.getElementById("listView");

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer patUZbjIH5L5eCO0M.db444e26deda63327d01fc6935a4c9684143302e300bf49447dbf8f9a5cc395d`, //${secrets.API_KEY}
        },
    };
    const response = await fetch(
        `https://api.airtable.com/v0/appx3kAqDzfrdw6NC/Respawn%20Point?returnFieldsByFieldId=true&filterByFormula=NOT({fld2mASM3OlRq1LFD}%20=%20'')`, options
    );
    const data = await response.json();

    console.log(data); //see Airtable data

    data.records.forEach(record => {
        let fields = record.fields;
        let eventID = record.id;
        let photos = fields["fldEwehoiY9W0QY9E"];
        let name = fields["fldQyz4DI6To3rQlZ"];
        let date = fields["fldXlmyk1BD64LcO3"];


    //-- HTML code for List view icons + onClick --
    if (photos && photos.length > 0){
        let cardList = `
    <div class="cardList rounded  m-2" onclick="openPopup('${record.id}')">
            <div class="imageIcon shadow-sm rounded">
                <img src="${photos[0].url}" class="img-fluid img-thumbnail" alt="${name}" style="width: 300px; height: 300px; object-fit: cover;">

                <div class="nameOverlay text-center d-flex">
                    <span>${name}</span>
                    <span style="font-size:11px; line-height: 40px;">${date}</span>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += cardList;
        }
    });
}
//-- Function for Pop-up Modal --
function openPopup(eventID){
    const originalCard = document.getElementById(eventID);
    const modalBody = document.getElementById("modalBodyContent");

    if(originalCard && modalBody){
        modalBody.innerHTML = originalCard.outerHTML;
        const myModal = new bootstrap.Modal(document.getElementById('eventModal'));
        myModal.show();
    }
}
//-- Call on Functions --
getAllRecords();
iconView();