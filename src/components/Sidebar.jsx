import React from 'react';
import { Link } from 'gatsby';

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'

import brandplh from '../images/brandplh.png'

import '../stylesheets/sidebar.sass'

export default function Sidebar({ activeTab }) {
    const [openVar, setOpen] = React.useState(false)

    return (
        <React.Fragment key={'bar'}>
            <IconButton onClick={() => setOpen(true)} style={{ color: 'white' }}><MenuIcon /></IconButton>
            <Drawer anchor={'left'} open={openVar}  onClose={() => setOpen(false)}>
                <div
                    className='drawer'
                    onClick={() => setOpen(false)}
                >
                    <Grid container style={{width: "100%"}}>
                        <Grid item xs={12}><IconButton onClick={() => setOpen(false)} style={{ color: '#4DCCBD' }}><CloseIcon /></IconButton></Grid>
                        <Grid item xs={12}><img src={brandplh} /></Grid>
                        <Grid item xs={12}><Link to='/'>Home</Link></Grid>
                        <Grid item xs={12}><Link to='/gallery'>Gallery</Link> </Grid>
                        <Grid item xs={12}><Link to='/bio'>Bio</Link> </Grid>
                    </Grid>

                </div>
            </Drawer>
        </React.Fragment>
    );
}