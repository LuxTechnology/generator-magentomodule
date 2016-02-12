<?php

class <%= fullModuleName %>_Block_Adminhtml_<%= name %>_<%= mode%> extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                  
        $this->_objectId = 'id';
        $this->_blockGroup = '<%= moduleIdentifier %>';
        $this->_controller = 'adminhtml_<%= name.toLowerCase() %>';
        $this->_mode = '<%= mode.toLowerCase() %>';
        
        <%if(saveButton) {%> 
            $this->_updateButton('save', 'label', Mage::helper('form')->__('Save'));
        <%}%>
    }
 
    public function getHeaderText()
    {
        return Mage::helper('form')->__('<%= title %>');
    }
}