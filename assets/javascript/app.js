var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var tFrequency = snapshot.val().frequency;

    var firstTime = snapshot.val().firstTrain;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#train-table tbody").append(
        `
                <tr>
                    <td>${snapshot.val().trainName}</td>
                    <td>${snapshot.val().destination}</td>
                    <td>${snapshot.val().frequency}</td>
                    <td>${tMinutesTillTrain}</td>
                    <td>${nextTrain}</td>
                </tr>
            `
    );
})

$("button").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var firstTrain = $("#ftt-input").val();
    var frequency = $("#frequency-input").val();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

});

