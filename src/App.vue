<template>
<div id="app">
    <h1 class=" text-white text-center p-1">Reporte</h1>
    <!-- <form v-bind:style="{ padding: '10px' }" v-on:submit.prevent="onSubmit" id="appForm"> -->
        <label v-bind:style="{ padding: '10px', margin: '10px' }">
            Radiobase</label>
        <input v-bind:style="{ padding: '10px', margin: '10px' }" id="inpRadioBase" name="RADIOBASES" placeholder="Radiobase" value="RBZA9931C003"  maxlength="12" />
        <label v-bind:style="{ padding: '10px', margin: '10px' }">Region</label>
        <input v-bind:style="{ padding: '10px', margin: '10px' }" id="inpRegion" name="REGION" placeholder="Region" value="6" maxlength="1" type="Number"/>
        <!-- <input id="dpFecha" class="btn btn-success"  v-bind:style="{ padding: '10px', margin: '10px' }" type="date" name="FECHA" placeholder="Fecha" value="" />  -->
        <!-- <input type="button" class="btn btn-success" @click="consultarRadioBase">Consultar</input> -->
        <button type="button" class="btn btn-success" @click="consultarRadioBase">Consultar</button>
    <!-- </form> -->

    <b-table striped hover :items="items"></b-table>

    <table id="tblRadio" class="table mt-5">
        <thead>
            <tr id="rotate">
                <th :style="{
              width: '90px',
              minWidth: '90px',
              height: '140px',
              border: '1px solid black',
              verticalAlign:'middle'
            }" scope="col">
                    Radiobases
                </th>
                <td :style="{
              transform: 'rotate(' + turn + 'deg)',
              width: '90px',
              height: '140px',
              border: '1px solid black',
              verticalAlign:'middle'
            }" v-for="i in aDateRange" :key="i">
                    {{ i }}
                </td>
            </tr>
        </thead>
        <tbody :class="tblBody">
            <tr v-for="i in Object.values(items)" :key="i" >
                <th v-bind:style="{ height: '50px', border: '1px solid black', verticalAlign:'middle' }" scope="row">
                    {{ i.RADIOBASE }}
                </th>
                <td  v-bind:style="[
              parseInt( J.TRAFICO) <= 15
                ? (ColorBG = 'red')
                : parseInt( J.TRAFICO) > 15 && parseInt( J.TRAFICO) <= 40
                ? (ColorBG = 'orange')
                : parseInt( J.TRAFICO) > 40 && parseInt( J.TRAFICO) <= 90
                ? (ColorBG = 'yellow')
                : parseInt( J.TRAFICO) > 90
                ? (ColorBG = 'green')
                : (ColorBG = 'gray'),
              {
                height: '50px',
                border: '1px solid black',
                backgroundColor: ColorBG,
                verticalAlign:'middle'
              },
            ]" v-for="J in Object.values(items)" :key="J">
                    {{ J.TRAFICO }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 20px;
}
#app h1 {
    background-color: #00529b
},
#tblRadio {
    border: 2px solid black;
}

#tblRadio td {
    border: 2px solid black;
}

#tblRadio th {
    border: 2px solid black;
}

#rotate td {
    -moz-transform: rotate(-90deg);
    /* FF3.5+ */
    -o-transform: rotate(-90deg);
    /* Opera 10.5 */
    -webkit-transform: rotate(-90deg);
    /* Saf3.1+, Chrome */
}

table,
th,
td {
    border: 1px solid black;
}

table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    color: black;
    background-color: #ffffff;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

td {
    color: black;
    background-color: #f9f9f9;
}

th,
td {
    color: black;
    min-width: 120px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
    name: "App",
    components: {},
    data() {
        return {
            items: [],
            date: "",
            rb: [],
            radiobases: "",
            region:"",
            aDateRange: [],
            aDateReport: {
                fechatrafico: {}
            },
            turn: 90,
            widthTd: 50,
            ColorBG: "white",
            IndexId: 0,
            Radiobases: [],
            radiobasesMaestro: [],
        };
    },
    beforeMount() {
        this.initTable();
        //this.maestroRadioBases();
    },
    mounted() {},
    updated() {
        for (let step = 0; step < 29; step++) {
            //document.getElementById("1").style.backgroundColor = "lightblue";
        }
    },
    methods: {
        colorBack(val) {
            console.log("aaaaaaa", val);
            return "red";
        },
        async maestroRadioBases() {
            const response = await axios.get(
                "https://testnodeapp01.herokuapp.com/maestroRadiobases"
            );
            console.log("response", response);
            this.radiobasesMaestro = response.data.results;
        },
        async consultarRadioBase() {
            // document.getElementById(".tblBody > td") ? document.getElementById(".tblBody > td").remove : document.getElementById(".tblBody > td")
            //let sDateP = document.getElementById("dpFecha").value;
            
            let sRegionInp = document.getElementById("inpRegion").value;
            this.region = sRegionInp
            let sRadioBaseInp = document.getElementById("inpRadioBase").value;
            this.radiobasesMaestro = [];
            this.radiobases = sRadioBaseInp;
            //this.date = sDateP;
            this.date = moment().format('YYYY-MM-DD');
            this.aDateRange = [];
            this.items = [];
            console.log("this.date", this.date);
            let fecha = moment.utc(this.date).endOf("day").format();
            console.log("fecha", fecha);
            this.aDateRange.push(moment(fecha).format("YYYY-MM-DD"));
            /*for (let step = 0; step < 29; step++) {
              let diasAtras;
              diasAtras = moment(fecha)
                .subtract(step + 1, "days")
                .format("YYYY-MM-DD");
              this.aDateRange.push(diasAtras);
            }*/
            this.aDateRange = this.aDateRange.sort().reverse();
            console.log("this.aDateRange", this.aDateRange);
    
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            const response = await axios.get(
                "https://testnodeapp01.herokuapp.com/reporteRadiobases?RADIOBASE=" +
                this.radiobases +
                "&REGION=" +
                this.region
            );
            console.log("response", response);
            var oData;
            this.items = response.data.results;

            this.items.forEach((item) => {
                oData = {
                    RADIOBASE: item.RADIOBASE,
                    REGION: item.REGION,
                    fechatrafico: {},
                };
                this.aDateRange.forEach((date) => {
                    const result = this.items.filter((item1) => item1.FECHA == date);
                    console.log("000 zzzzz", result);
                    if (result.length > 0) {
                        oData.fechatrafico[date] = result[0].TRAFICO;
                    } else {
                        if (!oData.fechatrafico[date]) {
                            oData.fechatrafico[date] = "";
                        }
                    }
                });
                console.log("oData", oData);
            });
            if (this.items.length == 0) {
                oData = {
                    RADIOBASE: "",
                    REGION: "",
                    fechatrafico: {},
                };
                this.aDateRange.forEach((date) => {
                    oData.fechatrafico[date] = "";
                });
            }

            console.log("oData Final", oData.fechatrafico);
            this.aDateReport = oData;
            console.log("Values", Object.values(this.aDateReport.fechatrafico));

            if (this.items.length == 0) {
                this.initTable();
            }
        },
        async initTable() {
            //let oData;
            let fecha = moment.utc(moment()).endOf("day").format();
            console.log("fecha" + fecha + " " + this.items.length.toString());
            this.aDateRange.push(moment(fecha).format("YYYY-MM-DD"));
            for (let step = 0; step < 29; step++) {
                let diasAtras;
                diasAtras = moment(fecha)
                    .subtract(step + 1, "days")
                    .format("YYYY-MM-DD");
                this.aDateRange.push(diasAtras);
            }
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            const response = await axios.get(
                "https://testnodeapp01.herokuapp.com/reporteRadiobases"
            );
            console.log("response", response);
            this.items = response.data.results;
            /* if (this.items.length == 0) {
               oData = {
                 RADIOBASE: "",
                 REGION: "",
                 fechatrafico: {},
               };
               this.aDateRange.forEach((date) => {
                 oData.fechatrafico[date] = "";
               });
               this.aDateReport = oData;
               console.log("oData yyyy", oData);
             } else {
               this.items.forEach((item) => {
                 oData = {
                   RADIOBASE: item.RADIOBASE,
                   REGION: item.REGION,
                   fechatrafico: {},
                 };
                 this.aDateRange.forEach((date) => {
                   const result = this.items.filter((item1) => item1.FECHA == date);
                   console.log("000 zzzzz", result);
                   if (result.length > 0) {
                     oData.fechatrafico[date] = result[0].TRAFICO;
                   } else {
                     if (!oData.fechatrafico[date]) {
                       oData.fechatrafico[date] = "";
                     }
                   }
                 });
                 console.log("oData", oData);
               });
             }*/
        },
    },
};
</script>
