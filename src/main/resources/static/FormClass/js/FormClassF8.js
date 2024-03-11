class FormClassF8 {
    loadInit = async () => {
        await this.getDataUser();
        this.createTableListUser(this.listUserIn4);
    }

    loadInitForRole = async () => {
        await this.getDataRole();
        this.createTableListRole(this.listRoleIn4);
    }

    listRoleIn4 = [];

    createTableListRole = (listRoleInformation) => {
        let tbodyContentString = '';
        listRoleInformation.forEach(e => {
            tbodyContentString +=
                '<tr>' +
                `<th scope="row">${e.roleId}</th>` +
                `<td>${e.roleName}</td>` +
                `<td>${e.description}</td>` +
                `</tr>`;
        });

        // Jquery
        $('#tbodyTableListRoleContent').html(tbodyContentString);
        let table = new DataTable('#tableListRole', {
            info: false,
            paging: true,
            ordering: false,
            lengthMenu: [
                [4, 5, 6, -1],
                [4, 5, 6, 'All']
            ]
        });

        const labelElement = document.querySelector('#tableListRole_length');
        labelElement.innerHTML = '';
        table.on('dblclick', 'tbody tr', function (x) {
            let data = table.row(this).data();
            $('#roleId').val(data[0]);
            $('#roleName').val(data[1]);
        });
    };

    listUserIn4 = [];

    createTableListUser = (listUserInformation) => {
        let tbodyContentString = '';
        listUserInformation.forEach(e => {
            tbodyContentString +=
                '<tr>' +
                `<th scope="row">${e.userId}</th>` +
                `<td>${e.userName}</td>` +
                `<td>${e.role.roleId}</td>` +
                `<td>${e.role.roleName}</td>` +
                `<td>${e.age}</td>` +
                `<td>${e.gmail}</td>` +
                `<td>${e.role.description}</td>` +
                `</tr>`;
        });


        // Jquery
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
        table.on('dblclick', 'tbody tr', function (x) {
                let data = table.row(this).data();
            $('#userId').val(data[0]);
            $('#userName').val(data[1]);
            $('#roleId').val(data[2]);
            $('#age').val(data[4]);
            $('#gmail').val(data[5]);
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
            gmail: x.querySelector('td:nth-child(6)').textContent
        };
        this.fillFormInformation(userIn4);
    };

    fillFormInformation = (userIn4) => {
        $('#userId').val(userIn4.userId);
        $('#userName').val(userIn4.userName);
        $('#roleId').val(userIn4.roleId);
        $('#age').val(userIn4.age);
        $('#gmail').val(userIn4.gmail);
    }

    btnClearForm_click = async () => {
        this.fillFormInformation({userId: '', userName: '',roleId: '' , age: '', gmail: ''})
    }

    btnSave_click = async () => {
        let dataForm = {
            userId: $('#userId').val(),
            userName: $('#userName').val(),
            roleId: $('#roleId').val(),
            age: $('#age').val(),
            gmail: $('#gmail').val()
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
        console.log("getDataUser");
        let {data: response} = await axios.get('http://localhost:8888/api/v1/users/getAllUser')
        this.listUserIn4 = response.data;
        console.log(this.listUserIn4);
    }

    getDataRole = async () => {
        console.log("getDataRole");
        let {data: response} = await axios.get('http://localhost:8888/api/v1/roles/getAllRole')
        this.listRoleIn4 = response.data;
        console.log(this.listRoleIn4);
    }



}










