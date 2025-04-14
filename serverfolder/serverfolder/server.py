from py5paisa import FivePaisaClient

cred={
    "APP_NAME":"5P50027160",
    "APP_SOURCE":"17234",
    "USER_ID":"r3TE4vpIQsD",
    "PASSWORD":"IpMv1BXmiBn",
    "USER_KEY":"Pm1ySKhwOCwRSz70mnu7xFlYV14vgEB4",
    "ENCRYPTION_KEY":"YVFG7ZTRd4jY8GwtOR0WEjtfMcLb7XDb"
    }



client = FivePaisaClient(cred=cred)
client.get_totp_session('50027160','944858','248112')

#Now Can directly call client.place_order()
req_list=[{ "Exch":"N","ExchType":"C","ScripCode":9348}]

req_data=client.Request_Feed('mf','s',req_list)
def on_message(ws, message):
    print(message)


client.connect(req_data)

client.receive_data(on_message)