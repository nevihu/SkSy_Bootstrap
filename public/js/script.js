$(document).ready(function(){
    updateTableWithTasks();

    addEventListeners();

    function updateTask(id, data) {
        $.ajax({
            url: "http://localhost:8080/tasks/" + id,
            type: "PUT",
            dataType: "text",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                updateTableWithTasks();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Veränderungen konnten nicht gespeichert werden");
                console.log(xhr.status);
                console.log(xhr)
                console.log(thrownError);
                console.log(ajaxOptions);
            }
        })
    }

    function addEventListeners() {
        $(".put").on("click", function () {

            var currentRowSelector = "#newTask"

            var desc = $(currentRowSelector + " #inlineFormInput").val();
            var deadline = new Date($(currentRowSelector + " #inlineFormInput2").val()).getTime();
            var progress = parseInt($(currentRowSelector + " #inlineFormInput3").val());
            var data = {"name": desc, "deadline": deadline, "progress": progress}

            postNewTask(desc, deadline, progress)

        })

        $(".delete").on("click", function () {
            var id = $(this).parent().attr("taskid")
            $.ajax({
                url: "http://localhost:8080/tasks/" + id,
                type: "DELETE",
                dataType: "text",
                success: function () {
                    updateTableWithTasks()
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Eintrag konnte nicht gelöscht werden")
                    console.log(xhr.status);
                    console.log(xhr)
                    console.log(thrownError);
                    console.log(ajaxOptions);
                }
            })
        })

        $(".change").on("click", function () {
            var id = $(this).parent().attr("taskid")
            var currentRowSelector = "#" + id
            console.log(currentRowSelector)

            var num = $(currentRowSelector).children()[0].innerHTML
            var desc = $(currentRowSelector).children()[1].innerHTML

            console.log($(currentRowSelector).children()[2].text)
            var now = $(currentRowSelector).children()[2].innerHTML

            var parts = now.split(".")

            // console.log(today)
            // var deadline = new Date($(currentRowSelector).children()[2].innerHTML);

            var deadline = new Date(parts[2], parts[1] - 1 , parseInt(parts[0]) + 1).toISOString().slice(0,10);
            var progress = $(currentRowSelector).children()[3].innerHTML

            console.log($(this).parent().innerHTML)
            console.log(typeof $(this).parent().innerHTML)

            var num_input = "<td>" + num + "</td>"
            var descr_input = "<td><input class=\"form-control mb-2\" id=\"inlineFormInput\" placeholder=\"TODO\" required type=\"text\" value=\"" + desc + "\"'></td>\n"
            var deadline_input = "<td><input class=\"form-control\" id=\"inlineFormInput2\" required type=\"date\" value=\"" + deadline + "\"></td>\n"
            var progress_input = "<td><input class=\"form-control\" id=\"inlineFormInput3\" placeholder=\"0\" required type=\"number\" value=\"" + progress + "\"></td>"
            var buttons_input = "<td taskid='" + id + "'><button class='update'><i class=\"fas fa-check\"></i></button></td>"

            $(currentRowSelector).html(num_input + descr_input + deadline_input + progress_input + buttons_input)
            // document.getElementById("end").valueAsDate = now

            $(".update").on("click", function () {
                var id = $(this).parent().attr("taskid")
                var currentRowSelector = "#" + id

                var desc = $(currentRowSelector + " #inlineFormInput").val();
                var deadline = new Date($(currentRowSelector + " #inlineFormInput2").val()).getTime();
                var progress = parseInt($(currentRowSelector + " #inlineFormInput3").val());
                var data = {"name": desc, "deadline": deadline, "progress": progress}
                updateTask(id, data)
            })
        })
    }

    function updateTableWithTasks() {
        $("tbody").empty();
        $.ajax({
            url: "http://localhost:8080/tasks",
            type: "GET",
            dataType: "json",
            success: function (data) {
                var sorted = sort(data);
                var counter = 0;
                var dateList = sorted.map(x => {
                    var date = dateFormat(new Date(x.deadline), 'EUROPEANSHORTWTIME').split(" ");
                    return {'date': date[0], 'time': date[1], 'name': x.name, 'progress': x.progress, 'id': x._id,
                        'count': ++counter}
                })

                dateList.forEach(x => {
                    $('tbody').append(wrapWithTdTags(x.id, x.count, x.name, x.date, x.progress))
                })

                //insert empty form row
                $("tbody").append('<tr id="newTask"><th scope="row">#</th>\n' +
                    '        <td><input class="form-control mb-2" id="inlineFormInput" placeholder="TODO" required type="text"></td>\n' +
                    '        <td><input class="form-control" id="inlineFormInput2" required type="date"></td>\n' +
                    '        <td><input class="form-control" id="inlineFormInput3" placeholder="0" required type="number"></td>\n' +
                    '        <td><button class="put"><i class="fas fa-check"></i></button></td></tr>');

                addEventListeners();

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(xhr)
                console.log(thrownError);
                console.log(ajaxOptions);
            }
        })
    }

    function wrapWithTdTags(id, ...rest){
        var result = "<tr id=\"" + id + "\" >"
        rest.forEach(x => result+= "<td>" + x + "</td>")
        var buttons = "<td taskid=" + id + "><button class='change'><i class=\"fas fa-pen\"></i></button><button class='delete'><i class=\"fas fa-trash\"></i></button></td>"
        return result + buttons + "</tr>"
    }

    function sort(data){
        var sorted = data.sort((x,y) => {
            if(x.deadline > y.deadline) return -1;
            if(x.deadline < y.deadline) return 1;
            else return 0;
        })
        return sorted;
    }

    function postNewTask(desc, deadline, progress){
        var jsonBody = {"name": desc, "deadline": deadline, "progress": progress}

        console.log(jsonBody);

        $.ajax({
            url: "http://localhost:8080/tasks",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(jsonBody),
            success: function (data) {
                console.log(data)
                alert("ToDo wurde erfolgreich hinzugefügt");
                emptyFields("inlineFormInput", "inlineFormInput2", "inlineFormInput3")
                updateTableWithTasks();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("ToDo konnte nicht erstellt werden");
                console.log(xhr.status);
                console.log(xhr)
                console.log(thrownError);
                console.log(ajaxOptions)
            }
        })
    }

    function emptyFields(...rest){
        rest.map(x => $("#" + x).val(""));
    }

})