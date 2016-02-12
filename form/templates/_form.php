<?php

class  <%= fullModuleName %>_Block_Adminhtml_<%= name %>_<%= mode %>_Form
    extends Mage_Adminhtml_Block_Widget_Form
{
    protected function _prepareForm()
    {
        // Instantiate a new form to display our brand for editing.
        $form = new Varien_Data_Form(array(
            'id' => '<%= mode%>_form',
            'action' => $this->getUrl(
                '<%= moduleIdentifier %>/<%= name%>/<%= mode.toLowerCase() %>',
                array(
                    '_current' => true,
                    'continue' => 0,
                )
            ),
            'method' => 'post',
        ));
        $form->setUseContainer(true);
        $this->setForm($form);

        // Define a new fieldset. We need only one for our simple entity.
        $fieldset = $form->addFieldset(
            'general',
            array(
                'legend' => $this->__('<%= title %>')
            )
        );


        <% fields.forEach(function(field, index) {%>
            $fieldset->addField('<%= field.name %>', '<%= field.type %>', array(
              'label'     => Mage::helper('form')->__('<%= field.title %>'),
              'class'     => <%= if(field.required) 'required-entry' %>,
              'required'  => <%= field.required %>,
              'name'      => '<%= field.name %>',
              'onclick' => "",
              'onchange' => "",
              'value'  => '<%= field.value %>',
              'disabled' => false,
              'readonly' => false,
              'after_element_html' => '',
              'tabindex' => <%= index %>
            ));
        <%});%>

        return $this;
    }
}