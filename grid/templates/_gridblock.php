<?php
 
class <%= fullModuleName %>_Block_Adminhtml_<%= name %>_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
    public function __construct()
    {
        parent::__construct();
        $this->setId('<%= blockIdentifier%>_grid');
        $this->setDefaultSort('increment_id');
        $this->setDefaultDir('DESC');
        $this->setSaveParametersInSession(true);
        $this->setUseAjax(true);
    }
 
    protected function _prepareCollection()
    {
        $collection = Mage::getResourceModel('__COLLECTION_NAME__');
 
        $this->setCollection($collection);
        parent::_prepareCollection();
        return $this;
    }
 
    protected function _prepareColumns()
    {
        $helper = Mage::helper('<%= moduleIdentifier %>');
 
        // $this->addColumn('increment_id', array(
        //     'header' => $helper->__('Order #'),
        //     'index'  => 'increment_id'
        // ));
 
        // $this->addColumn('purchased_on', array(
        //     'header' => $helper->__('Purchased On'),
        //     'type'   => 'datetime',
        //     'index'  => 'created_at'
        // ));
 
        // $this->addColumn('fullname', array(
        //     'header'       => $helper->__('Name'),
        //     'index'        => 'fullname',
        //     'filter_index' => 'CONCAT(customer_firstname, \' \', customer_lastname)'
        // ));
 
        // $this->addColumn('country', array(
        //     'header'   => $helper->__('Country'),
        //     'index'    => 'country_id',
        //     'renderer' => 'adminhtml/widget_grid_column_renderer_country'
        // ));
 
        // $this->addColumn('grand_total', array(
        //     'header'        => $helper->__('Grand Total'),
        //     'index'         => 'grand_total',
        //     'type'          => 'currency',
        //     'currency_code' => $currency
        // ));
 
        // $this->addColumn('order_status', array(
        //     'header'  => $helper->__('Status'),
        //     'index'   => 'status',
        //     'type'    => 'options',
        //     'options' => Mage::getSingleton('sales/order_config')->getStatuses(),
        // ));
 
        $this->addExportType('*/*/exportCsv', $helper->__('CSV'));
        $this->addExportType('*/*/exportExcel', $helper->__('Excel XML'));
 
        return parent::_prepareColumns();
    }
 
    public function getGridUrl()
    {
        return $this->getUrl('*/*/grid', array('_current'=>true));
    }
}