export const REPLY_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= subject %></title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, <%= primaryColor %> 0%, <%= secondaryColor %> 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .footer {
            background: #f9f9f9;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
       .btn {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, <%= primaryColor %> 0%, <%= secondaryColor %> 100%);
    color: white !important; /* Force white text */
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    margin: 20px 0;
    -webkit-text-fill-color: white !important; /* For some email clients */
    mso-color-alt: white; /* For Outlook */
}
        @media screen and (max-width: 480px) {
            .content { padding: 20px; }
            .header h1 { font-size: 20px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1><%= subject %></h1>
        </div>
        
        <div class="content">
            <p>Hello <%= recipientName %>,</p>
            
            <p>Thank you for taking the time to contact me through my portfolio. I truly appreciate your interest in my work.</p>
            
            <p>I've received your message and will get back to you as soon as possible.</p>
            
            <% if (customMessage) { %>
                <p><%= customMessage %></p>
            <% } %>
            
            <% if (portfolioUrl) { %>
                <div style="text-align: center;">
                    <a href="<%= portfolioUrl %>" class="btn">Visit My Portfolio</a>
                </div>
            <% } %>
            
            <p>Best regards,</p>
            <p><%= yourName %><br>
            <%= yourTitle %><br>
            <%= yourEmail %><br>
            <% if (yourPhone) { %><%= yourPhone %><br><% } %></p>
        </div>
        
        <div class="footer">
            <p>© <%= new Date().getFullYear() %> <%= yourName %>. All rights reserved.</p>
            <% if (socialLinks && socialLinks.length) { %>
                <p>
                    <% socialLinks.forEach(function(link, index) { %>
                        <a href="<%= link.url %>" style="color: <%= primaryColor %>; text-decoration: none;"><%= link.name %></a>
                        <%= index < socialLinks.length - 1 ? ' | ' : '' %>
                    <% }); %>
                </p>
            <% } %>
        </div>
    </div>
</body>
</html>
`;
