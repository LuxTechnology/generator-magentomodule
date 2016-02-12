<?php
 
class <%= fullModuleName %>_Block_Adminhtml_<%= name %> extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_blockGroup = '<%= moduleIdentifier%>';
        $this->_controller = 'adminhtml_<%= blockIdentifier%>';
        $this->_headerText = Mage::helper('<%= moduleIdentifier%>')->__('<%= title %>');
 
        parent::__construct();
        $this->_removeButton('add');
    }
}