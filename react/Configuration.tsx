import { promises } from 'fs'

import { FormattedMessage } from 'react-intl'
import React, { FC } from 'react'
import {
  Layout,
  PageHeader,
  PageBlock,
  Input,
  Button,
  ToastConsumer,
  ToastProvider,
} from 'vtex.styleguide'

const handleSubmit = (e: any) => {
  e.preventDefault()
  return { message: 'Bolota' }
}

const Configuration: FC = () => {
  return (
    <ToastProvider>
      <Layout>
        <PageHeader
          title={
            <FormattedMessage id="admin/nox-adapter-configuration-title" />
          }
          subtitle={
            <FormattedMessage id="admin/nox-adapter-configuration-subtitle" />
          }
        />
        <PageBlock variation="full">
          <ToastConsumer>
            {({ showToast }: { showToast: any }) => (
              <form onSubmit={(e) => showToast(handleSubmit(e))}>
                <div className="mb5">
                  <Input
                    label={
                      <FormattedMessage id="admin/nox-adapter-configuration-last-customer-id" />
                    }
                  ></Input>
                </div>
                <Button type="submit">
                  <FormattedMessage id="admin/nox-adapter-configuration-save" />
                </Button>
              </form>
            )}
          </ToastConsumer>
        </PageBlock>
      </Layout>
    </ToastProvider>
  )
}

export default Configuration
