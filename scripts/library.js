function debugJs($MyVar,$strName){    if (!$MyVar) var $MyVar;    if (!$strName)$strName="";    var varType = typeof($MyVar);    var strTitleDebug = "****HML-DEBUG****\n";        strTitleDebug += "Var" + (($strName!=0) ? " *" + $strName + "* " : "" )+ "Type " + varType;    console.log("\r\r");    console.info(strTitleDebug);    console.info($MyVar);    console.info("*****************");    return console.log("\r\r");}function validate_and_check_form(strFormId, boolSubmit, strColorNotifyInput, strColorTextAlert, intDurationAlert, strColorBackgroundNotify){                /*                                                                  //                EXPLICO VARIABLES QUE LE MANDO A MI FUNCION                        strFormId = id del formulario, div, tabla u objeto donde se encuentren contenidos mis inputs, textarea, radios ó checkbox a validar.                        boolSubmit = Puede venir en false ó true. Si viene en true quiere decir que si todo esta bien validado voy a hacer submit de mi form. (Obviamente solo la mando si es un form el que valido)                        strColorNotifyInput = El color del contorno que se agregan a los objetos que estan mal llenos por el usuario. Se manda como color Hexadecimal                        boolUseJqueryNotice = Este determina que tipo de alerta se va a utilizar, si se usa el jquery notice o un dialog...                        strColorTextAlert = Este es el color del texto que se muestra en la alerta                TIPOS DE DATOS DEFINIDOS (LOS QUE VALIDA), (necesita en el objeto la etiqueta de vtype)                        Automaticamente si el input se pide para validacion, se valida si va lleno.                        int = entero                        decimal = decimal                        date = fechas                        nit = Nit según la sat                        mail = valida correo electronico                        float = (nuevo) permite cantidades con punto flotante, mayores o iguales a 0                ETIQUETAS QUE SE USAN EN EL HTML (DENTRO DEL INPUT PARA CONFIGURAR LA VALIDADA)                        validate="true", este indica si el input se valida ó no. !importante                        vtype="", este indica con que tipo de dato se debe validar el input u objeto, pueden ser los tipos de datos comentados arriba                        vmessage="", Mensaje personalizado para cuando se llene mal                        vmessaje_vacio="", mensaje personalizado para cuando este vacio                        vtarget = "", esta etiqueta se utiliza para indicar en que input u objeto saldra la notificacion. Esto se hizo por si se queria validar un hidden por ejemplo, pero notificarlo en otro objeto.(notificarlo me refiero al resplandor del input)                */                if(!strFormId)strFormId="";                if(!boolSubmit)boolSubmit=false;                if(typeof(strColorNotifyInput) == "undefined" || strColorNotifyInput == "")strColorNotifyInput="#C10000";                if(typeof(strColorTextAlert) == "undefined" || strColorTextAlert == "")strColorTextAlert="white";                if(typeof(strColorBackgroundNotify) == "undefined" || strColorBackgroundNotify == "")strColorBackgroundNotify="danger";                if(typeof(intDurationAlert) == "undefined" || intDurationAlert == "")intDurationAlert=5000;                boolCheckErrorsInForm = true;                if(strFormId != ""){                        arrErrorsCampos = {};                        $("#"+strFormId+" input, #"+strFormId+" textarea, #"+strFormId+" select").each(function(intKey){                                strTypeAction = "";                                if($(this).attr("validate") && $(this).attr("validate") != "false"){                                        ($(this).attr("vtype"))?strInputDataType = $(this).attr("vtype"):strInputDataType="string";                                        ($(this).val() && $(this).val() != "")?strInputValue = $(this).val():strInputValue="";                                        if($(this).attr("vtarget") && $(this).attr("vtarget") != ""){                                                strVtarget = $(this).attr("vtarget");                                                strVtarget = $(strVtarget);                                        }else{                                                strVtarget = $(this);                                        }                                        if(strInputDataType != ""){                                                if($(this).attr("vmessage") && $(this).attr("vmessage") != ""){                                                        CustomText = $(this).attr("vmessage");                                                }else{                                                        CustomText = "empty";                                                }                                                if($(this).attr("vmessaje_vacio") && $(this).attr("vmessaje_vacio") != ""){                                                        CustomTextEmpty = $(this).attr("vmessaje_vacio");                                                }else{                                                        CustomTextEmpty = "empty";                                                }                                                if(this.type == undefined)                                                        this.type = "";                                                if((this.type).toLowerCase() == "checkbox"){                                                        if(!$(this).is(":checked")){                                                                strInputValue = "";                                                                boolOk = false;                                                        }else{                                                                boolOk=true;                                                                strInputValue = "lleno";                                                        }                                                        boolCheckErrorsInForm = goNotifyArray(boolOk,intKey,strVtarget,strColorNotifyInput);                                                }                                                else if((this.tagName).toLowerCase() == "select"){                                                        if(!$(this).attr("multiple")){                                                                boolBadInput = validateDataType($(this).attr("vtype"),$(this).val());                                                                boolCheckErrorsInForm = goNotifyArray(boolBadInput,intKey,strVtarget,strColorNotifyInput);                                                        }                                                        else{                                                                strInputValue = this.value;                                                                boolOk = (strInputValue.length != 0);                                                                boolCheckErrorsInForm = goNotifyArray(boolOk,intKey,strVtarget,strColorNotifyInput);                                                        }                                                }                                                else if((this.type).toLowerCase() == "radio"){                                                        if(this.name == undefined)                                                                this.name = "";                                                        if(this.name != ""){                                                                var boolOk = false;                                                                strInputValue = "";                                                                $("#" + strFormId + " input[name='" + this.name + "']").each(function (){                                                                        if($(this).is(":checked")){                                                                                boolOk = true;                                                                                if(strInputValue == ""){                                                                                        strInputValue = "lleno";                                                                                }                                                                        }                                                                });                                                                boolCheckErrorsInForm = goNotifyArray(boolOk,intKey,strVtarget,strColorNotifyInput);                                                        }                                                }                                                else{                                                        boolBadInput = validateDataType($(this).attr("vtype"),$(this).val());                                                        boolCheckErrorsInForm = goNotifyArray(boolBadInput,intKey,strVtarget,strColorNotifyInput);                                                }                                        }                                }                                else if($(this).attr("validate") && $(this).attr("validate") == "false"){                                        showInputsBadInDOM($(this),"quit");                                }                        })                        if(boolCheckErrorsInForm === false){                           showAlertForBadInputs(arrErrorsCampos,strColorTextAlert,intDurationAlert,strColorBackgroundNotify);                           return false;                        }else{                                if(boolSubmit === true)                                        $("#"+strFormId).submit();                                else                                        return true;                        }                }        }function goNotifyArray(boolBadInput,intKey,strVtarget,strColorNotifyInput){        if(boolBadInput === false){                if(typeof(arrErrorsCampos["bad"]) == "undefined")arrErrorsCampos["bad"] = {};                if(typeof(arrErrorsCampos["bad"][intKey]) == "undefined")arrErrorsCampos["bad"][intKey] = {};                arrErrorsCampos["bad"][intKey]["CustomText"] = CustomText;                arrErrorsCampos["bad"][intKey]["CustomTextEmpty"] = CustomTextEmpty;                (strInputValue != "")?arrErrorsCampos["bad"][intKey]["empty"] = false:arrErrorsCampos["bad"][intKey]["empty"] = true;                boolCheckErrorsInForm = false;                showInputsBadInDOM(strVtarget,"show",strColorNotifyInput);        }else{                showInputsBadInDOM(strVtarget,"quit");        }        return boolCheckErrorsInForm;}function validateDataType(strDataType, strValue){        //para todo, si retorno true lo dejo pasar, false no...        if(strDataType == "int"){                 if((parseFloat(strValue) == parseInt(strValue)) && !isNaN(strValue)){                         return true;                 }else{                         return false;                 }        }        else if(strDataType == "decimal"){                if (isNaN(strValue) || strValue.toString().indexOf(".") < 0) {                        return false;                }else{                        return true;                }        }        else if(strDataType == "phone"){                var RegExPattern = /^[0-9]{8}$|^[0-9]{11}$/;                if (strValue.match(RegExPattern)) {                        return true;                } else {                        return false;                }        }        else if(strDataType == "nit"){                if (!strValue || strValue =='') {                        return false;                }                var nitRegExp = /^[0-9]+(-?[0-9kK])?$/;                if (strValue.match(nitRegExp)) {                        return true;                }                else{                        return false;                }        }        else if(strDataType == "mail"){                var RegExPattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;                if (strValue.match(RegExPattern)) {                        return true;                } else {                        return false;                }        }        else if(strDataType == "date"){                intDay = 0;                intMonth = 0;                intYear = 0;                boolCheck = false;                arrDate = strValue.split("-");                if(arrDate.length == 3){                        intDay = arrDate[0];                        intMonth = arrDate[1];                        intYear = arrDate[2];                        boolCheck = true;                }                else{                        arrDate = strValue.split("/");                        if(arrDate.length == 3){                                intDay = arrDate[0];                                intMonth = arrDate[1];                                intYear = arrDate[2];                                boolCheck = true;                        }                }                if(intDay.length == 4 && boolCheck == true){                        intYear = arrDate[0];                        intMonth = arrDate[1];                        intDay = arrDate[2];                        boolCheck = true;                }                if(boolCheck == true){                        if(intYear >= 1990){                                intDateCheck = boolCheckDate(intYear,intMonth,intDay)                                if(intDateCheck == false){                                        return false;                                }else{                                        return true;                                }                        }else{                                return false;                        }                }else{                        return false;                }        }        else if(strDataType == "url"){                var RegExPattern = /^(ht|f)tps?:\/\/(\w+([\.\-\w]+)?\.([a-z]{2,4})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?(\/.*)?$/i                if (strValue.match(RegExPattern)) {                        return true;                } else {                        return false;                }        }        else if(strDataType == "float"){                var reg = new RegExp(/^[0-9]\d*(\.\d+)?$/);                var boolValid = reg.test(strValue);                if(boolValid)                        return true;                else                        return false;        }        else{                if(strValue != 0)                        return true;                else                        return false;        }}function showAlertForBadInputs(arrErrorsCampos,strColorTextAlert,intDurationAlert,strColorBackgroundNotify){                boolShowGeneralBadMessaje = false;                boolShowGeneralEmptyMessaje = false;                strMessaje = "<table>";                $.each(arrErrorsCampos,function(intKey,ObjInputs){                        $.each(ObjInputs,function(intKey2,strNombre){                                if(strNombre["empty"] == true && strNombre["CustomTextEmpty"] == "empty"){                                        //mensaje predeterminado para inputs vacios                                        if(boolShowGeneralEmptyMessaje == false){                                                strMessaje += "<tr>";                                                strMessaje += "<td style='font-size: 25px; color: "+strColorTextAlert+";'><b>&#8226;</b></td>";                                                strMessaje += "<td style='font-size:14px; padding-left: 10px; color: "+strColorTextAlert+";'>";                                                strMessaje += "Los campos marcados son obligatorios y no pueden estar vacios.";                                                strMessaje += "</td>";                                                strMessaje += "</tr>";                                                boolShowGeneralEmptyMessaje = true;                                        }                                }                                else if(strNombre["empty"] == true && strNombre["CustomTextEmpty"] != "empty"){                                        //mensaje custom para input vacios                                        strMessaje += "<tr>";                                        strMessaje += "<td style='font-size: 25px; color: "+strColorTextAlert+";'><b>&#8226;</b></td>";                                        strMessaje += "<td style='font-size:14px; padding-left: 10px; color: "+strColorTextAlert+";'>";                                        strMessaje += strNombre["CustomTextEmpty"]+".";                                        strMessaje += "</td>";                                        strMessaje += "</tr>";                                }                                else if(strNombre["empty"] == false && strNombre["CustomText"] == "empty"){                                        //mensaje predeterminado para inputs llenos                                        if(boolShowGeneralBadMessaje == false){                                                strMessaje += "<tr>";                                                strMessaje += "<td style='font-size: 25px; color: "+strColorTextAlert+";'><b>&#8226;</b></td>";                                                strMessaje += "<td style='font-size:14px; padding-left: 10px; color: "+strColorTextAlert+";'>";                                                strMessaje += "Por favor llene correctamente los campos.";                                                strMessaje += "</td>";                                                strMessaje += "</tr>";                                                boolShowGeneralBadMessaje = true;                                        }                                }                                else if(strNombre["empty"] == false && strNombre["CustomText"] != "empty"){                                        //mensaje custom para inputs llenos                                        strMessaje += "<tr>";                                        strMessaje += "<td style='font-size: 25px; color: "+strColorTextAlert+";'><b>&#8226;</b></td>";                                        strMessaje += "<td style='font-size:14px; padding-left: 10px; color: "+strColorTextAlert+";'>";                                        strMessaje += strNombre["CustomText"]+".";                                        strMessaje += "</td>";                                        strMessaje += "</tr>";                                };                        })                })                strMessaje += "</table>";                //si quiero usar el jquery notice...                $.notify({                        message: strMessaje,                },{                        type: strColorBackgroundNotify,                        animate: {                                enter: 'animated fadeInDown',                                exit: 'animated fadeOutUp'                        }                });                    /*if(intDurationAlert > 1){                        jQuery.noticeAdd({                                text: strMessaje,                                type: strColorBackgroundNotify,                                stay: false,                                stayTime: intDurationAlert                        });                }                else{                        jQuery.noticeAdd({                                text: strMessaje,                                type: strColorBackgroundNotify,                                stay: true                        });                }*/}function showInputsBadInDOM(ObjInput,strAction,strColorNotifyInput){                if(strAction == "show"){                        strColors = "0px 0px 5px 1px "+strColorNotifyInput;                        $(ObjInput).css({"box-shadow":strColors,"-webkit-box-shadow":strColors,"-webkit-box-shadow":strColors});                }else if(strAction == "quit"){                        strColors = "0px 0px 0px 0px #FFFFFF";                        $(ObjInput).css({"box-shadow":strColors,"-webkit-box-shadow":strColors,"-webkit-box-shadow":strColors})                }        }        /*------------- Valida que solo se ingrese numeros ---------------*/function SoloEntero(evt){	if(window.event){// IE		key = evt.keyCode;	}else		key = evt.which;	//var key=window.event.keyCode;//codigo de tecla. 		if((key > 47 && key < 58) || key == 8){		return true;	}else{		return false;	}}function SoloMonto(evt){	if(window.event){// IE		key = evt.keyCode;	}else		key = evt.which;	//var key=window.event.keyCode;//codigo de tecla. 	if((key > 47 && key < 58) || key == 46 || key == 8){		return true;	}else{		return false;	}}