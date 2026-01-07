import fs from 'fs'
import path from 'path'

// Load .env file manually BEFORE importing payload
const envPath = path.resolve(process.cwd(), '.env')
console.log('Loading .env from:', envPath)
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8')
    envConfig.split('\n').forEach((line) => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim()
            if (!process.env[key.trim()]) {
                process.env[key.trim()] = value
            }
        }
    })
} else {
    console.error('.env file not found!')
}

console.log('PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
console.log('DATABASE_URI exists:', !!process.env.DATABASE_URI)

async function createAdmin() {
    console.log('Initializing Payload...')
    let getLocalPayload
    try {
        // Dynamically import payload to ensure env vars are set first
        const payloadLib = await import('../lib/payload')
        getLocalPayload = payloadLib.getLocalPayload
    } catch (e) {
        console.error('Failed to import payload lib:', e)
        process.exit(1)
    }

    let payload
    try {
        payload = await getLocalPayload()
    } catch (e) {
        console.error('Failed to initialize Payload:', e)
        process.exit(1)
    }
    console.log('Payload initialized.')

    const users = await payload.find({
        collection: 'users',
        limit: 10,
    })

    if (users.docs.length > 0) {
        let output = 'Users already exist:\n'
        for (const user of users.docs) {
            output += `- ID: ${user.id}, Email: ${user.email}\n`
            if (user.email === 'admin@example.com') {
                try {
                    await payload.update({
                        collection: 'users',
                        id: user.id,
                        data: { password: 'password' }
                    })
                    output += '  - Password reset to: password\n'
                } catch (err) {
                    output += '  - Failed to reset password: ' + err + '\n'
                }
            }
        }
        output += 'Please use one of these accounts to log in.\n'
        console.log(output)
        fs.writeFileSync('users_list.txt', output)
    } else {
        console.log('No users found. Creating default admin...')
        try {
            const user = await payload.create({
                collection: 'users',
                data: {
                    email: 'admin@example.com',
                    password: 'password',
                },
            })
            const output = 'Admin created successfully!\nEmail: admin@example.com\nPassword: password\n'
            console.log(output)
            fs.writeFileSync('users_list.txt', output)
        } catch (error) {
            console.error('Failed to create admin:', error)
            fs.writeFileSync('users_list.txt', 'Failed to create admin: ' + error)
        }
    }
    process.exit(0)
}

createAdmin()
