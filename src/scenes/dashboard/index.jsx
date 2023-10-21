import React from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import { Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from 'components/BreakdownChart'
import OverviewChart from 'components/OverviewChart'
import { useGetDashboardQuery } from 'state/api'
import StatBox from 'components/StatBox'

const Dashboard = () => {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'Tên khách hàng',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      flex: 1,
    },
    {
      field: 'products',
      headerName: 'Số sản phẩm ',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Thành tiền',
      flex: 1,
      renderCell: (params) => `${params.value.toLocaleString()} đ`,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Trang chủ" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Tổng só khách hàng"
          value={data && data.totalCustomers}
          // increase="+14%"
          // description="So với tháng trước"
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
        />
        <StatBox
          title="Doanh thu hàng ngày"
          value={data && data.todayStats.totalSales}
          // increase="+21%"
          // description="So với tháng trước"
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Doanh thu hàng tháng"
          value={data && data.thisMonthStats.totalSales}
          // increase="+5%"
          // description="So với tháng trước"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
        />
        <StatBox
          title="Doanh thu hàng năm"
          value={data && data.yearlySalesTotal}
          // increase="+43%"
          // description="So với tháng trước"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />}
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '1rem',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.alt,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.orders) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Doanh thu theo danh mục
          </Typography>
          <BreakdownChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
