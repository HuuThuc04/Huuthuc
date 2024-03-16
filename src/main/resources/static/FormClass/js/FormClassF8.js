class FormClassF8 {

    loadInit = async () => {
        await this.getDataUser();
        this.createTableListUser(this.listUserIn4);
    }



    listUserIn4 = [];

    createTableListUser = (listUserInformation) => {
        let tbodyContentString = '';
        listUserInformation.forEach(e => {
            tbodyContentString +=
                '<tr>' +
                `<th scope="row">${e.userId}</th>` +
                `<td>${e.userName}</td>` +
                `<td>${e.roleId}</td>` +
                `<td>${e.role.roleName}</td>` +
                `<td>${e.age}</td>` +
                `<td>${e.gmail}</td>` +
                `<td>${e.description}</td>` +
                `</tr>`;
        });




        // Jquery
        if ($.fn.DataTable.isDataTable('#tableListUser')) {
            $('#tableListUser').DataTable().destroy();
        }

        $('#tbodyTableLisUserContent').html(tbodyContentString);
        let table = new DataTable('#tableListUser', {
            info: false,
            paging: true,
            ordering: false,
            lengthMenu: [
                [4, 5, 6, -1],
                [4, 5, 6, 'All']
            ]
        });

        const labelElement = document.querySelector('#tableListUser_length');
        labelElement.innerHTML = '';
        table.on('dblclick', 'tbody tr', function(x) {
            let data = table.row(this).data();
            if (data && data.length > 0) {
                $('#userId').val(data[0] || '');
                $('#userName').val(data[1] || '');
                $('#roleId').val(data[2] || '');
                $('#age').val(data[4] || '');
                $('#gmail').val(data[5] || '');
                $('#description').val(data[6] || '');
            }
        });
    };




    rowLicked = (x) => {
        // kiểu dữ liệu Json {key: value}
        // js: const: hằng số
        //      var: có thể ghi đè và 1 lần khai báo
        //      let: trong 1 block
        let userIn4 = {
            userId: x.querySelector('th:nth-child(1)').textContent,
            userName: x.querySelector('td:nth-child(2)').textContent,
            roleId: x.querySelector('td:nth-child(3)').textContent,
            age: x.querySelector('td:nth-child(5)').textContent,
            gmail: x.querySelector('td:nth-child(6)').textContent,
            description: x.querySelector('td:nth-child(7)').textContent

        };
        this.fillFormInformation(userIn4);
    };

    fillFormInformation = (userIn4) => {
        $('#userId').val(userIn4.userId);
        $('#userName').val(userIn4.userName);
        $('#roleId').val(userIn4.roleId);
        $('#age').val(userIn4.age);
        $('#gmail').val(userIn4.gmail);
        $('#description').val(userIn4.description);
    }

    btnClearForm_click = async () => {
        this.fillFormInformation({userId: '', userName: '',roleId: '' , age: '', gmail: '', description: ''})
    }

    btnDelete_click = async () => {
        const userIdToDelete = $('#userId').val();

        if (!userIdToDelete) {
            swal({
                text: 'Please select a user to delete.',
                icon: 'warning'
            });
            return;
        }

        const confirmDelete = await swal({
            text: 'Are you sure you want to delete this user?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        });

        if (confirmDelete) {
            try {
                let dataForm = {
                    userId: $('#userId').val(),
                    userName: $('#userName').val(),
                    roleId: $('#roleId').val(),
                    age: $('#age').val(),
                    gmail: $('#gmail').val(),
                    description: $('#description').val()
                }
                // Gửi yêu cầu DELETE đến API để xóa dữ liệu
                const response = await axios.delete(`http://localhost:8888/api/v1/users/deleteUser`, {data: dataForm});

                if (response.data.status) {
                    await this.loadInit();
                    swal({
                        text: response.data.message,
                        icon: 'success'
                    });
                } else {
                    await this.loadInit();
                    swal({
                        text: response.data.message,
                        icon: 'warning'
                    });
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                swal({
                    text: 'An error occurred while deleting the user.',
                    icon: 'error'
                });
            }
        }
    };

    btnSave_click = async () => {
        let dataForm = {
            userId: $('#userId').val(),
            userName: $('#userName').val(),
            roleId: $('#roleId').val(),
            roleName: $('#roleName').val(),
            age: $('#age').val(),
            gmail: $('#gmail').val(),
            description: $('#description').val()
        }
        let validate = this. validateDataFormUser(dataForm);
        if(!validate.status){
            swal({
                text: validate.message,
                icon: 'warning'
            });
        }
        else{
            let {data: response} = await axios.post("http://localhost:8888/api/v1/users/postUser", dataForm)
            if (response.status) {
                await this.loadInit();
                swal({
                    text: response.message,
                    icon: 'success'
                });
            }
            else{
                await this.loadInit();
                swal({
                    text: response.message,
                    icon: 'warning'
                });
            }

        }
    };

    validateDataFormUser = (userIn4) => {
        // nếu userIn4 != null || != undefined => true
        // ! => nếu userIn4 == null || == undefined => true
        if(!userIn4.userId || !userIn4.userName || !userIn4.roleId || !userIn4.age || !userIn4.gmail) {
            return {
                status: false,
                message: 'Required to fill in all information'
            }
        }
        else{
            return {
                status: true,
                message: 'Successful data validation'
            }
        }
    };
    //Call Api by Ajax of Jquery
    // getDataUserIn4 = () => {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/api/v1/users',
    //         contentType: 'application/json',
    //         success: function (data) {
    //             console.log("Call Api /api/v1/users Success");
    //             this.formatDataFromBEToFE(data);
    //         }.bind(this),
    //         error: function (error) {
    //             console.log("Call Api /api/v1/users Fail");
    //         }
    //     }, {})
    // };

    // Axios
    getDataUser = async () => {
        console.table("getDataUser");
        let {data: response} = await axios.get('http://localhost:8888/api/v1/users/getAllUser')
        this.listUserIn4 = response.data;
        console.table(this.listUserIn4);
   }
}









