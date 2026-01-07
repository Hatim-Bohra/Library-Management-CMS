import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env')
console.log('Checking .env at:', envPath)

if (fs.existsSync(envPath)) {
    console.log('.env file found.')
    const content = fs.readFileSync(envPath, 'utf8')
    console.log('Content length:', content.length)

    // Check keys without printing values
    const hasSecret = content.includes('PAYLOAD_SECRET')
    const hasDb = content.includes('DATABASE_URI')
    console.log('Contains PAYLOAD_SECRET:', hasSecret)
    console.log('Contains DATABASE_URI:', hasDb)
} else {
    console.error('.env file NOT found.')
}
