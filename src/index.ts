// This file is to be imported for client code using the network interface.
import {
  addPersistedQueries,
  PersistedQueryNetworkInterface,
} from './network_interface/ApolloNetworkInterface'

import { getQueryDocumentKey, OutputMap } from './common'

export { PersistedQueryNetworkInterface, addPersistedQueries, getQueryDocumentKey, OutputMap }
