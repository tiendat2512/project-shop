import {  Table } from 'antd';
import React from 'react'
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
    const { selectionType = 'checbox', data = [], isLoading = false, columns = [] } = props

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <Loading isLoading={isLoading}>
       
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
         </Loading >
    )
}

export default TableComponent