import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {DependenciesProvider, useTranslate} from '@akeneo-pim-community/legacy-bridge';
import {
  Modal,
  useToggleState,
  ModalCloseButton,
  useShortcut,
  Key,
  ModalConfirmButton,
  useStorageState,
} from '@akeneo-pim-community/shared';
import {Form, FormValue} from './Form';
import {Select} from './Select';
import {Option} from './Option';
import {AkeneoThemedProps, FileXlsxIcon, FileCsvIcon, pimTheme} from 'akeneo-design-system';

const Container = styled.div`
  color: ${({theme}: AkeneoThemedProps) => theme.color.grey140};
  font-size: ${({theme}: AkeneoThemedProps) => theme.fontSize.default};
  cursor: default;
  text-transform: none;
  line-height: initial;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: ${({theme}: AkeneoThemedProps) => theme.color.grey140};
  font-size: 38px;
  margin: 10px 0 60px;
`;

const Subtitle = styled.div`
  color: ${({theme}: AkeneoThemedProps) => theme.color.purple100};
  font-size: 19px;
  text-transform: uppercase;
`;

const QuickExportButton = styled.button`
  color: inherit;
  padding: 0;
  margin: 0;
  background-color: inherit;
  border: none;
  font-size: inherit;
  text-transform: inherit;
  cursor: pointer;
`;

type QuickExportConfiguratorProps = {
  showWithLabelsSelect: boolean;
  onActionLaunch: (formValue: FormValue) => void;
  getProductCount: () => number;
};

const QuickExportConfigurator = (props: QuickExportConfiguratorProps) => (
  <DependenciesProvider>
    <ThemeProvider theme={pimTheme}>
      <QuickExportConfiguratorContainer {...props} />
    </ThemeProvider>
  </DependenciesProvider>
);

const QuickExportConfiguratorContainer = ({
  showWithLabelsSelect,
  onActionLaunch,
  getProductCount,
}: QuickExportConfiguratorProps) => {
  const [isModalOpen, openModal, closeModal] = useToggleState(false);
  const translate = useTranslate();
  const [formValue, setFormValue] = useStorageState<FormValue>({}, 'quick_export_configuration');

  useShortcut(Key.Escape, closeModal);

  const productCount = getProductCount();
  const readyToSubmit =
    undefined !== formValue['type'] &&
    undefined !== formValue['context'] &&
    (undefined !== formValue['with-labels'] || !showWithLabelsSelect);

  return (
    <>
      <QuickExportButton title={translate('pim_datagrid.mass_action_group.quick_export.label')} onClick={openModal}>
        {translate('pim_datagrid.mass_action_group.quick_export.label')}
      </QuickExportButton>
      {isModalOpen && (
        <Container>
          <Modal>
            <Content>
              <ModalCloseButton title={translate('pim_common.close')} onClick={closeModal} />
              <ModalConfirmButton
                title={translate('pim_common.export')}
                onClick={() => {
                  onActionLaunch(formValue);
                  closeModal();
                }}
                disabled={!readyToSubmit}
              >
                {translate('pim_common.export')}
              </ModalConfirmButton>
              <Subtitle>
                {`${translate('pim_datagrid.mass_action.quick_export.configurator.subtitle')} | ${translate(
                  'pim_common.result_count',
                  {itemsCount: productCount.toString()},
                  productCount
                )}`}
              </Subtitle>
              <Title>{translate('pim_datagrid.mass_action.quick_export.configurator.title')}</Title>
              <Form value={formValue} onChange={setFormValue}>
                <Select name="type">
                  <Option value="csv" title={translate('pim_datagrid.mass_action.quick_export.configurator.csv')}>
                    <FileCsvIcon size={48} />
                    {translate('pim_datagrid.mass_action.quick_export.configurator.csv')}
                  </Option>
                  <Option value="xlsx" title={translate('pim_datagrid.mass_action.quick_export.configurator.xlsx')}>
                    <FileXlsxIcon size={48} />
                    {translate('pim_datagrid.mass_action.quick_export.configurator.xlsx')}
                  </Option>
                </Select>
                <Select name="context">
                  <Option
                    value="grid-context"
                    title={translate('pim_datagrid.mass_action.quick_export.configurator.grid_context')}
                  >
                    {translate('pim_datagrid.mass_action.quick_export.configurator.grid_context')}
                  </Option>
                  <Option
                    value="all-attributes"
                    title={translate('pim_datagrid.mass_action.quick_export.configurator.all_attributes')}
                  >
                    {translate('pim_datagrid.mass_action.quick_export.configurator.all_attributes')}
                  </Option>
                </Select>
                {showWithLabelsSelect && (
                  <Select name="with-labels">
                    <Option
                      value="with-codes"
                      title={translate('pim_datagrid.mass_action.quick_export.configurator.with_codes')}
                    >
                      {translate('pim_datagrid.mass_action.quick_export.configurator.with_codes')}
                    </Option>
                    <Option
                      value="with-labels"
                      title={translate('pim_datagrid.mass_action.quick_export.configurator.with_labels')}
                    >
                      {translate('pim_datagrid.mass_action.quick_export.configurator.with_labels')}
                    </Option>
                  </Select>
                )}
              </Form>
            </Content>
          </Modal>
        </Container>
      )}
    </>
  );
};

export {QuickExportConfigurator};
