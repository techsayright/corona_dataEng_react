import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core'; 
import CountUp from 'react-countup';
import cx from 'classnames';

import style from './Cards.module.css';

// const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
const Cards = ({infected, recovered, death}) => {
    //console.log(props); //inpalce of data we can firstly verify by (props)
    // if(!confirmed){
    //     return 'Loading...';
    // }
    return(
        // <h1>Cards</h1>
 
        <div className={style.container}>
            <Grid container spacing={3} justify="center">

                {/* card 1  */}
                {/* here xs for mobile view is set 12 and md for destopview is set 3  */}
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography varaint="h5">
                            <CountUp 
                                start={0}
                                end={infected}
                                // end={55555555555}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                        <Typography varaint="body2">Number of active case of COVID-19</Typography>
                    </CardContent>
                </Grid>

                {/* card 2 */}
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography varaint="h5">
                            <CountUp 
                                start={0}
                                end={recovered}
                                // end={55555555555}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                        <Typography varaint="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>

                {/* card 3 */}
                <Grid item component={Card} xs={12} md={3} className={cx(style.card, style.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography varaint="h5">
                            <CountUp 
                                start={0}
                                end={death}
                                // end={55555444444455}
                                duration={2.5}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                        <Typography varaint="body2">Number of deaths caused by  COVID-19</Typography>
                    </CardContent>
                </Grid>

            </Grid>
        </div>


    )
}

export default Cards;