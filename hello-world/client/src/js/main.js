import { Screen } from './components/index.js'
import { FetchHTTPClient } from './infra/index.js'
import { FinancialReleaseService } from './services/index.js'

new Screen(new FinancialReleaseService(new FetchHTTPClient(), 'http://localhost:3000'))
