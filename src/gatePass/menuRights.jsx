import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
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
function MenuRights() {
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
            minHeight: "500px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle",
            boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "25px",
            color: "gray",
        },
    }));
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={2}>
            <Paper className={classes.paper}>
                <Typography variant="body2" color="textPrimary" component="span">
                    Menu Rights
                </Typography>
            </Paper>
            <Grid container alignItems="center" direction="column">
                <Grid item alignItems="center" direction="row">
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Section</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            defaultValue={state.company}

                            onChange={handleChangeTypeSection}
                            input={<OutlinedInput label="Gatepass Type" />}
                        >
                            {state.AllSubCostCenter.map((type, index) => (
                                <ManuI key={index} value={type.SubCostCenterID}>
                                    {type.SubCostCenter}
                                </ManuI>
                            ))}
                        </Select>
                    </FormControl>
                    <Autocomplete
                        sx={{ m: 1, width: 300 }}
                        open={openD}
                        onOpen={() => {
                            if (inputValue) {
                                setOpenD(true);
                            }
                        }}
                        onClose={() => setOpenD(false)}
                        inputValue={inputValue}
                        onChange={handleEmpChange}
                        onInputChange={(e, value, reason) => {
                            setInputValue(value);
                            if (!value) {
                                setOpenD(false);
                            }
                        }}
                        filterOptions={filterOptions}
                        options={state.AllEmp}
                        getOptionLabel={(option) => option.EmpName}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Requested Employee"
                                variant="outlined"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export { MenuRights };
