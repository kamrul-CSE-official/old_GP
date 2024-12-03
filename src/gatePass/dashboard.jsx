import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import animationDataG from "../Assets/general.json";
import animationDataM from "../Assets/medical.json";
import animationDataR from "../Assets/refund.json";
import animationDataV from "../Assets/vehicle.json";
import Chart from 'react-apexcharts'
import { commonService, alertService, accountService } from "../_services";
import Lottie from 'react-lottie';
import {
    Grid,
    FormControl,
    Select,
    InputLabel,
    OutlinedInput,
    MenuItem as ManuI,
    Paper,
    Typography,
    TextField,
    Modal,
    Autocomplete,
    Button,
    Box,
    createFilterOptions,
} from "@mui/material";
function Dashboard() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        dropdown: {
            minWidth: 220,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        header: {
            minHeight: 50,
        },
        paper: {
            display: "flex",
            marginTop: "30px",
            marginLeft: '30px',
            minHeight: "60px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "25px",
            color: "gray",
        },
        bopaper: {
            display: "flex",
            minHeight: "200px",
            width: "200px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle",
            borderRadius: "25px",
            color: "red",
        },
    }));
    const [RequestCount, setRequestCount] = useState([]);
    useEffect(() => {
      debugger;
      commonService.ReqCount().then((x) => {
        debugger;
        setRequestCount(x);
      });
    }, []);
    const ChatObj = {
        series: [{
            name: 'General',
            data: [0, 0, 0, 0, 0, 0, 0]
          }, {
            name: 'Medical',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Returnable',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Non-Returnable',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Vechile',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
        ],
          options: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
              categories: ["2022-03-27T00:00:00.000Z", "2022-03-27T01:30:00.000Z", "2022-03-27T02:30:00.000Z", "2022-03-27T03:30:00.000Z", "2022-03-27T04:30:00.000Z", "2022-03-27T05:30:00.000Z", "2022-03-27T06:30:00.000Z"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        
        }
    const donoutObj = {
     
            series: [0, 0, 0, 0, 0, 0],
            
            options: {
                chart: {
                  type: 'donut',
                },
                fill: {
                    type: 'gradient',
                  },
                labels: ['General', 'Medical', 'Returnable', 'Non-Returnable','VEHICLE'],
                responsive: [{
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200
                    },
                    legend: {
                      position: 'bottom'
                    }
                  }
                }]
              },
            
            
           
    }
    const defaultOptionsG = {
        loop: true,
        autoplay: true,
        animationData: animationDataG,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const defaultOptionsV = {
        loop: true,
        autoplay: true,
        animationData: animationDataV,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const defaultOptionsM = {
        loop: true,
        autoplay: true,
        animationData: animationDataM,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const defaultOptionsR = {
        loop: true,
        autoplay: true,
        animationData: animationDataR,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2}>
            <Paper className={classes.paper}>
                <Typography variant="body2" color="textPrimary" component="span">
                    DashBoard
                </Typography>
            </Paper>
            <Grid style={{marginTop: 10,marginLeft:20}} container direction="row" alignItems="flex-start" justifyContent="space-around">
                
                <Grid item container xs={3}  direction="column" alignItems="flex-start">
                    <Paper  elevation={3}  style={{ height: "95%", width: "95%",margin:5  }} className={classes.bopaper}>
                       <Grid direction="column" alignItems="flex-start" justifyContent="space-around">
                          <Typography variant="h4">GENERAL</Typography>
                       <Grid item direction="row" alignItems="flex-start" justifyContent="space-around">
                            <Lottie options={defaultOptionsG}
                                height="100%"
                                width="50%"
                            />
                            <Typography variant="h1">{RequestCount.length == 0 ? 0 : RequestCount[0].General}</Typography>
                        </Grid>
                        
                       </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={3}  direction="column" alignItems="flex-start">
                    <Paper  elevation={3}  style={{ height: "95%", width: "95%",margin:5  }} className={classes.bopaper}>
                       <Grid direction="column" alignItems="flex-start" justifyContent="space-around">
                          <Typography variant="h4">MEDICAL</Typography>
                       <Grid item direction="row" alignItems="flex-start" justifyContent="space-around">
                            <Lottie options={defaultOptionsM}
                                height="100%"
                                width="50%"
                            />
                            <Typography variant="h1">{RequestCount.length == 0 ? 0 :RequestCount[0].Medical}</Typography>
                        </Grid>
                        
                       </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={3}  direction="column" alignItems="flex-start">
                    <Paper  elevation={3}  style={{ height: "95%", width: "95%",margin:5  }} className={classes.bopaper}>
                       <Grid direction="column" alignItems="flex-start" justifyContent="space-around">
                          <Typography variant="h4">RETURNABLE</Typography>
                       <Grid item direction="row" alignItems="flex-start" justifyContent="space-around">
                            <Lottie options={defaultOptionsR}
                                height="100%"
                                width="50%"
                            />
                            <Typography variant="h1">{RequestCount.length == 0 ? 0 : RequestCount[0].Returnable}</Typography>
                        </Grid>
                        
                       </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={3}   direction="column" alignItems="flex-start">
                    <Paper  elevation={3}  style={{ height: "95%", width: "95%",margin:5 }} className={classes.bopaper}>
                       <Grid direction="column" alignItems="flex-start" justifyContent="space-around">
                          <Typography variant="h4">VEHICLE</Typography>
                       <Grid item direction="row" alignItems="flex-start" justifyContent="space-around">
                            <Lottie options={defaultOptionsV}
                                height="100%"
                                width="50%"
                            />
                            <Typography variant="h1">{RequestCount.length == 0 ? 0 : RequestCount[0].Vehicle}</Typography>
                        </Grid>
                        
                       </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
            <Chart options={donoutObj.options} series={donoutObj.series} type="donut" width={500} height={320} />
            </Paper>
            <Paper style={{marginTop:10}} className={classes.paper}>
            <Chart options={ChatObj.options} series={ChatObj.series} type="area" width={700} height={320} />
            </Paper>
        </Grid>
    );
}

export { Dashboard }