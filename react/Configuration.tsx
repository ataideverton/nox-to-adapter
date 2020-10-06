import { promises } from 'fs'

import { useQuery, useApolloClient } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import React, { FC, useState, useEffect } from 'react'
import {
  Layout,
  PageHeader,
  PageBlock,
  Input,
  Button,
  ToastConsumer,
  ToastProvider,
} from 'vtex.styleguide'

import getSettings from './queries/getSettings.gql'
import postSettings from './queries/postSettings.gql'

const Configuration: FC = () => {
  const { data } = useQuery(getSettings)
  const client = useApolloClient()
  const [settings, setSettings] = useState<Settings>({
    lastCustomerId: '',
    maxCustomerId: ''
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    return client
      .query({
        query: postSettings,
        variables: {
          settings,
        },
      })
      .then((result: any) => {
        if (result.data.postSettings.status) {
          return {
            message: (
              <FormattedMessage id="admin/b2b-cnae.layout.configuration-success" />
            ),
          }
        }
        return {
          message: (
            <FormattedMessage id="admin/b2b-cnae.layout.configuration-failure" />
          ),
        }
      })
  }

  useEffect(() => {
    if (data) {
      setSettings(data.getSettings)
    }
  }, [data])

  if (!data) {
    return null
  }

  return (
    <ToastProvider>
      <Layout>
        <PageHeader
          title={<FormattedMessage id="admin/nox-to-adapter-title" />}
          subtitle={<FormattedMessage id="admin/nox-to-adapter-subtitle" />}
        />
        <PageBlock variation="full">
          <ToastConsumer>
            {({ showToast }: { showToast: any }) => (
              <form
                onSubmit={(e) =>
                  handleSubmit(e).then((result: any) => showToast(result))
                }
              >
                <div className="mb5">
                  <Input
                    label={
                      <FormattedMessage id="admin/nox-to-adapter-last-customer-id" />
                    }
                    value={settings.lastCustomerId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSettings({
                        ...settings,
                        lastCustomerId: e.target.value,
                      })
                    }}
                  ></Input>
                </div>
                <div className="mb5">
                  <Input
                    label={
                      <FormattedMessage id="admin/nox-to-adapter-last-customer-id" />
                    }
                    value={settings.maxCustomerId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSettings({
                        ...settings,
                        maxCustomerId: e.target.value,
                      })
                    }}
                  ></Input>
                </div>
                <Button type="submit">
                  <FormattedMessage id="admin/nox-to-adapter-save" />
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

export interface Settings {
  lastCustomerId: string
  maxCustomerId: string
}
