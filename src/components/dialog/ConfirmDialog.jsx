// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   useTheme,
// } from '@mui/material'
// import React from 'react'

// const ConfirmDialog = () => {
//   const theme = useTheme()

//   return (
//     <Dialog
//       sx={{ backgroundColor: theme.palette.primary[700] }}
//       open={open}
//       onClose={() => setOpen(false)}
//     >
//       <DialogTitle>{'Bạn có chắc chắn sẽ xoá sản phẩm ?'}</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Sẽ không thể khôi phục sau khi xoá, hãy chắc chắn về điều này
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button variant="contained" onClick={() => setOpen(false)}>
//           Huỷ
//         </Button>
//         <Button variant="outlined" color="error" onClick={() => handleDelete(_id)} autoFocus>
//           Xoá
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default ConfirmDialog
