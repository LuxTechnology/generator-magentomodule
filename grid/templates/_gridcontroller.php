<?php
 
class <%= fullModuleName %>_Adminhtml_<%= name %>Controller extends Mage_Adminhtml_Controller_Action
{
    public function indexAction()
    {
        $this_title($this->__('<%= title %>'));
        $this->loadLayout();
        // $this->_setActiveMenu('sales/sales');
        $this->_addContent($this->getLayout()->createBlock('<%= moduleIdentifier %>/adminhtml_<%= blockIdentifier%>'));
        $this->renderLayout();
    }
 
    public function gridAction()
    {
        $this->loadLayout();
        $this->getResponse()->setBody(
            $this->getLayout()->createBlock('<%= moduleIdentifier %>/adminhtml_<%= blockIdentifier%>_grid')->toHtml()
        );
    }
 
    public function exportCsvAction()
    {
        $fileName = '<%= moduleIdentifier %>.csv';
        $grid = $this->getLayout()->createBlock('<%= moduleIdentifier %>/adminhtml_<%= blockIdentifier%>_grid');
        $this->_prepareDownloadResponse($fileName, $grid->getCsvFile());
    }
 
    public function exportExcelAction()
    {
        $fileName = '<%= moduleIdentifier %>.xml';
        $grid = $this->getLayout()->createBlock('<%= moduleIdentifier %>/adminhtml_<%= blockIdentifier%>_grid');
        $this->_prepareDownloadResponse($fileName, $grid->getExcelFile($fileName));
    }
}