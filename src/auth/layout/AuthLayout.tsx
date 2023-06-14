import { Grid, Typography } from "@mui/material"

interface LayoutProps {
    children : JSX.Element,
    title: string
}


export const AuthLayuout = ({children, title = ''}: LayoutProps) => {

  return (
    <Grid container
        spacing= {0}
        direction="column"
        alignItems = "center"
        justifyContent = "center"
        sx={ { 
            minHeight : '100vh',
            minWidth: '100vw',
            backgroundColor: 'black', 
            padding: 4,
        
          }}
    >

        <Grid item
        className = 'box-shadow'
        xs = { 3 }
        sx = {{
                width: {sm: 450},
                backgroundColor: 'white', 
                padding : 3, 
                borderRadius: 2}}
        >

        <Typography variant="h5" sx={{mb:1}} color='black' textAlign='center'>{ title }</Typography>

            {children}

        </Grid>

    </Grid>
  )

}