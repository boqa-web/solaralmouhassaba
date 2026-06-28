<script>
    const defaultConfig = {
      site_title: "شمس المحاسبة",
      hero_title: "منصة شمس المحاسبة",
      hero_subtitle: "الوسيط التقني بين المحاسبين والزبائن في جميع الولايات الـ58",
      service1_title: "المحاسبة المالية",
      service2_title: "التدقيق والمراجعة",
      service3_title: "الاستشارات الضريبية",
      service4_title: "إعداد التقارير",
      contact_title: "تواصل معنا",
      contact_subtitle: "نحن هنا لمساعدتك في جميع احتياجاتك المحاسبية",
      background_color: "#f8fafc",
      primary_color: "#0E4D7C",
      secondary_color: "#2473A9",
      text_color: "#042845",
      accent_color: "#E5CB4C"
    };

    async function onConfigChange(config) {
      document.getElementById('site-title').textContent = config.site_title || defaultConfig.site_title;
      document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
      document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
      document.getElementById('service1-title').textContent = config.service1_title || defaultConfig.service1_title;
      document.getElementById('service2-title').textContent = config.service2_title || defaultConfig.service2_title;
      document.getElementById('service3-title').textContent = config.service3_title || defaultConfig.service3_title;
      document.getElementById('service4-title').textContent = config.service4_title || defaultConfig.service4_title;
      document.getElementById('contact-title').textContent = config.contact_title || defaultConfig.contact_title;
      document.getElementById('contact-subtitle').textContent = config.contact_subtitle || defaultConfig.contact_subtitle;

      const bgColor = config.background_color || defaultConfig.background_color;
      const primaryColor = config.primary_color || defaultConfig.primary_color;
      const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const accentColor = config.accent_color || defaultConfig.accent_color;

      document.body.style.background = `linear-gradient(135deg, ${bgColor} 0%, #e2e8f0 100%)`;
      document.body.style.color = textColor;

      const logos = document.querySelectorAll('.logo');
      logos.forEach(logo => logo.style.color = primaryColor);

      const sectionTitles = document.querySelectorAll('.section-title');
      sectionTitles.forEach(title => title.style.color = textColor);

      const serviceTitles = document.querySelectorAll('.service-card h3');
      serviceTitles.forEach(title => title.style.color = textColor);

      const heroTitle = document.getElementById('hero-title');
      if (heroTitle) {
        heroTitle.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`;
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.webkitTextFillColor = 'transparent';
        heroTitle.style.backgroundClip = 'text';
      }

      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(num => {
        num.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`;
        num.style.webkitBackgroundClip = 'text';
        num.style.webkitTextFillColor = 'transparent';
        num.style.backgroundClip = 'text';
      });
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.config.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              }
            }
          },
          {
            get: () => config.accent_color || defaultConfig.accent_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.config.accent_color = value;
                window.elementSdk.setConfig({ accent_color: value });
              }
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            }
          },
          {
            get: () => config.primary_color || defaultConfig.primary_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.config.primary_color = value;
                window.elementSdk.setConfig({ primary_color: value });
              }
            }
          },
          {
            get: () => config.secondary_color || defaultConfig.secondary_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.config.secondary_color = value;
                window.elementSdk.setConfig({ secondary_color: value });
              }
            }
          }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["site_title", config.site_title || defaultConfig.site_title],
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
        ["service1_title", config.service1_title || defaultConfig.service1_title],
        ["service2_title", config.service2_title || defaultConfig.service2_title],
        ["service3_title", config.service3_title || defaultConfig.service3_title],
        ["service4_title", config.service4_title || defaultConfig.service4_title],
        ["contact_title", config.contact_title || defaultConfig.contact_title],
        ["contact_subtitle", config.contact_subtitle || defaultConfig.contact_subtitle]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }

    // Initialize application
    document.addEventListener('DOMContentLoaded', function() {
      initDataSDK();
      updateUserInterface();
      
      // Set default user type selection
      const clientOption = document.querySelector('[onclick="selectUserType(\'client\')"]');
      if (clientOption) {
        clientOption.classList.add('selected');
      }
    });

    function showSection(sectionId) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }

      const menuItems = document.querySelectorAll('.sidebar-menu a');
      menuItems.forEach(item => item.classList.remove('active'));
      
      if (event && event.target) {
        event.target.classList.add('active');
      }

      if (window.innerWidth <= 1024) {
        document.getElementById('sidebar').classList.remove('open');
      }
    }

    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('open');
    }

    function handleContactForm(event) {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      
      const successMessage = document.createElement('div');
      successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #E5CB4C 0%, #83610D 100%);
        color: #042845;
        padding: 20px 40px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      `;
      successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
      
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
      event.target.reset();
    }

    document.addEventListener('click', function(e) {
      if (e.target.matches('.sidebar-menu a')) {
        e.preventDefault();
      }
    });

    // Service selection and form handling
    let selectedService = '';

    function selectService(serviceType) {
      selectedService = serviceType;
      const serviceSelection = document.getElementById('service-selection');
      const orderFormContainer = document.getElementById('order-form-container');
      const formTitle = document.getElementById('form-title');
      
      // Update form title based on service type
      if (serviceType === 'accounting') {
        formTitle.textContent = 'طلب خدمة المحاسبة';
      } else if (serviceType === 'financial') {
        formTitle.textContent = 'طلب خدمة المالية';
      }
      
      // Hide service selection and show form
      serviceSelection.style.display = 'none';
      orderFormContainer.style.display = 'block';
      
      // Smooth scroll to form
      orderFormContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

    function backToSelection() {
      const serviceSelection = document.getElementById('service-selection');
      const orderFormContainer = document.getElementById('order-form-container');
      
      // Show service selection and hide form
      serviceSelection.style.display = 'block';
      orderFormContainer.style.display = 'none';
      
      // Reset form
      document.querySelector('.order-form').reset();
      
      // Smooth scroll to selection
      serviceSelection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

    function handleOrderForm(event) {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      data.serviceType = selectedService;
      
      // Add uploaded files data
      data.uploadedFiles = getUploadedFilesData();
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #0E4D7C 0%, #2473A9 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 16px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(4, 40, 69, 0.3);
        text-align: center;
        max-width: 450px;
        backdrop-filter: blur(20px);
      `;
      
      const serviceTypeName = selectedService === 'accounting' ? 'المحاسبة' : 'المالية';
      const filesCount = uploadedFiles.length;
      const filesText = filesCount > 0 ? `مع ${filesCount} ملف مرفق` : '';
      
      successMessage.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
        <div style="font-size: 20px; margin-bottom: 10px;">تم إرسال طلبك بنجاح!</div>
        <div style="font-size: 16px; opacity: 0.9;">سنتواصل معك قريباً بخصوص خدمة ${serviceTypeName}</div>
        ${filesText ? `<div style="font-size: 14px; opacity: 0.8; margin-top: 8px;">${filesText}</div>` : ''}
      `;
      
      document.body.appendChild(successMessage);
      
      // Remove message after 4 seconds
      setTimeout(() => {
        document.body.removeChild(successMessage);
        
        // Reset form and files
        event.target.reset();
        uploadedFiles = [];
        document.getElementById('uploaded-files').style.display = 'none';
        document.getElementById('files-list').innerHTML = '';
        
        backToSelection(); // Return to service selection
      }, 4000);
      
      console.log('Order submitted:', data);
    }

    // Set minimum date to today for help date input
    document.addEventListener('DOMContentLoaded', function() {
      const helpDateInput = document.getElementById('helpDate');
      if (helpDateInput) {
        const today = new Date().toISOString().split('T')[0];
        helpDateInput.min = today;
      }
      
      // Initialize file upload functionality
      initFileUpload();
    });

    // File Upload System
    let uploadedFiles = [];
    const maxFiles = 10;
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    function initFileUpload() {
      const fileInput = document.getElementById('file-input');
      const uploadArea = document.getElementById('file-upload-area');
      
      if (!fileInput || !uploadArea) return;

      // File input change event
      fileInput.addEventListener('change', handleFileSelect);
      
      // Drag and drop events
      uploadArea.addEventListener('click', () => fileInput.click());
      uploadArea.addEventListener('dragover', handleDragOver);
      uploadArea.addEventListener('dragleave', handleDragLeave);
      uploadArea.addEventListener('drop', handleFileDrop);
    }

    function handleFileSelect(event) {
      const files = Array.from(event.target.files);
      processFiles(files);
      event.target.value = ''; // Reset input
    }

    function handleDragOver(event) {
      event.preventDefault();
      event.currentTarget.classList.add('dragover');
    }

    function handleDragLeave(event) {
      event.preventDefault();
      event.currentTarget.classList.remove('dragover');
    }

    function handleFileDrop(event) {
      event.preventDefault();
      event.currentTarget.classList.remove('dragover');
      
      const files = Array.from(event.dataTransfer.files);
      processFiles(files);
    }

    function processFiles(files) {
      // Check total files limit
      if (uploadedFiles.length + files.length > maxFiles) {
        showErrorMessage(`يمكنك رفع حد أقصى ${maxFiles} ملفات فقط`);
        return;
      }

      files.forEach(file => {
        // Validate file size
        if (file.size > maxFileSize) {
          showErrorMessage(`حجم الملف ${file.name} كبير جداً. الحد الأقصى 5MB`);
          return;
        }

        // Validate file type
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'image/jpeg',
          'image/jpg',
          'image/png'
        ];

        if (!allowedTypes.includes(file.type)) {
          showErrorMessage(`نوع الملف ${file.name} غير مدعوم`);
          return;
        }

        // Add file to uploaded files
        const fileObj = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'success'
        };

        uploadedFiles.push(fileObj);
        addFileToUI(fileObj);
      });

      updateFilesDisplay();
    }

    function addFileToUI(fileObj) {
      const filesList = document.getElementById('files-list');
      const uploadedFilesContainer = document.getElementById('uploaded-files');
      
      // Show uploaded files container
      uploadedFilesContainer.style.display = 'block';

      // Create file item element
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      fileItem.dataset.fileId = fileObj.id;

      // Determine file icon type
      let iconType = 'other';
      let iconText = '📄';
      
      if (fileObj.type.includes('pdf')) {
        iconType = 'pdf';
        iconText = 'PDF';
      } else if (fileObj.type.includes('word') || fileObj.type.includes('document')) {
        iconType = 'doc';
        iconText = 'DOC';
      } else if (fileObj.type.includes('sheet') || fileObj.type.includes('excel')) {
        iconType = 'xls';
        iconText = 'XLS';
      } else if (fileObj.type.includes('image')) {
        iconType = 'img';
        iconText = '🖼️';
      }

      fileItem.innerHTML = `
        <div class="file-icon ${iconType}">${iconText}</div>
        <div class="file-info">
          <div class="file-name" title="${fileObj.name}">${fileObj.name}</div>
          <div class="file-size">${formatFileSize(fileObj.size)}</div>
        </div>
        <div class="file-status success">
          <span>✅</span>
          <span>تم الرفع</span>
        </div>
        <button type="button" class="file-remove" onclick="removeFile('${fileObj.id}')" title="حذف الملف">
          ×
        </button>
      `;

      filesList.appendChild(fileItem);
    }

    function removeFile(fileId) {
      // Remove from uploaded files array
      uploadedFiles = uploadedFiles.filter(file => file.id != fileId);
      
      // Remove from UI
      const fileItem = document.querySelector(`[data-file-id="${fileId}"]`);
      if (fileItem) {
        fileItem.remove();
      }

      updateFilesDisplay();
      
      // Hide container if no files
      if (uploadedFiles.length === 0) {
        document.getElementById('uploaded-files').style.display = 'none';
      }
    }

    function updateFilesDisplay() {
      const filesCount = document.getElementById('files-count');
      const count = uploadedFiles.length;
      
      if (count === 0) {
        filesCount.textContent = '0 ملف';
      } else if (count === 1) {
        filesCount.textContent = '1 ملف';
      } else if (count === 2) {
        filesCount.textContent = '2 ملف';
      } else if (count <= 10) {
        filesCount.textContent = `${count} ملفات`;
      } else {
        filesCount.textContent = `${count} ملف`;
      }
    }

    function formatFileSize(bytes) {
      if (bytes === 0) return '0 بايت';
      
      const k = 1024;
      const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function getUploadedFilesData() {
      return uploadedFiles.map(fileObj => ({
        name: fileObj.name,
        size: fileObj.size,
        type: fileObj.type,
        // In a real application, you would upload the file to a server
        // and store the file URL or ID here
        data: 'File data would be processed on server'
      }));
    }

    // Authentication System
    let currentUser = null;
    let users = JSON.parse(localStorage.getItem('shams_users') || '[]');

    // Authentication Modal Functions
    function toggleAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (currentUser) {
        showUserDashboard();
      } else {
        modal.style.display = 'flex';
        showLoginForm();
      }
    }

    function closeAuthModal() {
      const modal = document.getElementById('auth-modal');
      modal.style.display = 'none';
      resetForms();
    }

    function showLoginForm() {
      document.getElementById('auth-title').textContent = 'تسجيل الدخول';
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('register-form').style.display = 'none';
      document.getElementById('user-dashboard').style.display = 'none';
    }

    function showRegisterForm() {
      document.getElementById('auth-title').textContent = 'إنشاء حساب جديد';
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form').style.display = 'block';
      document.getElementById('user-dashboard').style.display = 'none';
    }

    function showUserDashboard() {
      const modal = document.getElementById('auth-modal');
      modal.style.display = 'flex';
      document.getElementById('auth-title').textContent = 'لوحة التحكم';
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form').style.display = 'none';
      document.getElementById('user-dashboard').style.display = 'block';
      
      updateDashboardContent();
    }

    function resetForms() {
      document.querySelectorAll('.auth-form form').forEach(form => form.reset());
      document.getElementById('accountant-fields').style.display = 'none';
      hideLoadingStates();
    }

    function showLoadingState(buttonId) {
      const button = document.getElementById(buttonId);
      button.disabled = true;
      button.querySelector('.btn-text').style.display = 'none';
      button.querySelector('.btn-loading').style.display = 'block';
    }

    function hideLoadingStates() {
      document.querySelectorAll('.auth-btn').forEach(btn => {
        btn.disabled = false;
        btn.querySelector('.btn-text').style.display = 'block';
        btn.querySelector('.btn-loading').style.display = 'none';
      });
    }

    // Handle user type selection for registration
    document.addEventListener('change', function(e) {
      if (e.target.id === 'user-type') {
        const accountantFields = document.getElementById('accountant-fields');
        if (e.target.value === 'accountant') {
          accountantFields.style.display = 'block';
          // Make accountant fields required
          document.getElementById('experience').required = true;
          document.getElementById('specialization').required = true;
          document.getElementById('hourly-rate').required = true;
        } else {
          accountantFields.style.display = 'none';
          // Remove required from accountant fields
          document.getElementById('experience').required = false;
          document.getElementById('specialization').required = false;
          document.getElementById('hourly-rate').required = false;
        }
      }
    });

    // Handle Login
    async function handleLogin(event) {
      event.preventDefault();
      showLoadingState('login-btn');
      
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        currentUser = user;
        localStorage.setItem('shams_current_user', JSON.stringify(user));
        updateUserInterface();
        showSuccessMessage('تم تسجيل الدخول بنجاح!');
        setTimeout(() => {
          showUserDashboard();
        }, 1000);
      } else {
        showErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      
      hideLoadingStates();
    }

    // Handle Registration
    async function handleRegister(event) {
      event.preventDefault();
      showLoadingState('register-btn');
      
      const formData = new FormData(event.target);
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');
      
      // Validate password confirmation
      if (password !== confirmPassword) {
        showErrorMessage('كلمات المرور غير متطابقة');
        hideLoadingStates();
        return;
      }
      
      // Check if email already exists
      const email = formData.get('email');
      if (users.find(u => u.email === email)) {
        showErrorMessage('البريد الإلكتروني مستخدم بالفعل');
        hideLoadingStates();
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        userType: formData.get('userType'),
        createdAt: new Date().toISOString(),
        isActive: formData.get('userType') === 'client' // Clients are active immediately
      };
      
      // Add accountant-specific fields
      if (formData.get('userType') === 'accountant') {
        newUser.experience = formData.get('experience');
        newUser.specialization = formData.get('specialization');
        newUser.hourlyRate = formData.get('hourlyRate');
        newUser.isActive = false; // Accountants need approval
      }
      
      // Save user
      users.push(newUser);
      localStorage.setItem('shams_users', JSON.stringify(users));
      
      currentUser = newUser;
      localStorage.setItem('shams_current_user', JSON.stringify(newUser));
      
      updateUserInterface();
      
      if (newUser.userType === 'client') {
        showSuccessMessage('تم إنشاء حسابك بنجاح! مرحباً بك في شمس المحاسبة');
      } else {
        showSuccessMessage('تم إنشاء حسابك بنجاح! سيتم مراجعة حسابك خلال 24-48 ساعة');
      }
      
      setTimeout(() => {
        showUserDashboard();
      }, 1500);
      
      hideLoadingStates();
    }

    // Handle Logout
    function handleLogout() {
      currentUser = null;
      localStorage.removeItem('shams_current_user');
      updateUserInterface();
      closeAuthModal();
      showSuccessMessage('تم تسجيل الخروج بنجاح');
    }

    // Update UI based on authentication state
    function updateUserInterface() {
      const userStatus = document.getElementById('user-status');
      
      if (currentUser) {
        userStatus.textContent = currentUser.name;
      } else {
        userStatus.textContent = 'تسجيل الدخول';
      }
    }

    // Update dashboard content
    function updateDashboardContent() {
      if (!currentUser) return;
      
      document.getElementById('user-name').textContent = currentUser.name;
      
      if (currentUser.userType === 'client') {
        document.getElementById('user-type-display').textContent = 'عميل';
        document.getElementById('client-dashboard').style.display = 'block';
        document.getElementById('accountant-dashboard').style.display = 'none';
        
        // Update client stats (mock data)
        document.getElementById('client-orders').textContent = '3';
        document.getElementById('pending-orders').textContent = '1';
        document.getElementById('completed-orders').textContent = '2';
      } else {
        document.getElementById('user-type-display').textContent = 'محاسب';
        document.getElementById('client-dashboard').style.display = 'none';
        document.getElementById('accountant-dashboard').style.display = 'block';
        
        // Update accountant stats (mock data)
        document.getElementById('new-requests').textContent = '5';
        document.getElementById('active-projects').textContent = '2';
        document.getElementById('monthly-earnings').textContent = '45,000 دج';
        
        // Update account status
        const accountStatus = document.getElementById('account-status');
        if (currentUser.isActive) {
          accountStatus.innerHTML = `
            <div class="status-active" style="display: flex; align-items: center; gap: 15px; background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 12px;">
              <div style="font-size: 32px;">✅</div>
              <div>
                <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 16px; font-weight: 700;">حسابك مفعل</h4>
                <p style="margin: 0; color: #15803d; font-size: 14px;">يمكنك الآن استقبال الطلبات والعمل مع العملاء</p>
              </div>
            </div>
          `;
        }
      }
    }

    // Utility functions for messages
    function showSuccessMessage(message) {
      showMessage(message, 'success');
    }

    function showErrorMessage(message) {
      showMessage(message, 'error');
    }

    function showMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 20px 30px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
      `;
      
      if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        messageDiv.style.color = 'white';
        messageDiv.innerHTML = `✅ ${message}`;
      } else {
        messageDiv.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        messageDiv.style.color = 'white';
        messageDiv.innerHTML = `❌ ${message}`;
      }
      
      document.body.appendChild(messageDiv);
      
      setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
          document.body.removeChild(messageDiv);
        }, 300);
      }, 3000);
    }

    // Dashboard action functions
    function viewMyOrders() {
      closeAuthModal();
      showSection('orders');
    }

    function manageRequests() {
      showSuccessMessage('قريباً: إدارة الطلبات الواردة');
    }

    function updateProfile() {
      showSuccessMessage('قريباً: تحديث الملف الشخصي');
    }

    // Initialize authentication on page load
    document.addEventListener('DOMContentLoaded', function() {
      // Load current user from localStorage
      const savedUser = localStorage.getItem('shams_current_user');
      if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
      }
      
      // Add CSS animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('.content-section');
      const menuItems = document.querySelectorAll('.sidebar-menu a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(current)) {
          item.classList.add('active');
        }
      });
    });
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9a8d01e7b24ed07f',t:'MTc2NDg2OTE3Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script>
  
 <script>
async function handleOrderForm(e) {
    e.preventDefault();

    const scriptURL = "https://script.google.com/macros/s/AKfycbyCLXxvDb6XSiJ_dfEENbHmH1Or1oFdFdtZ6DDRr6IUqacghKS0QFmFaVM7VWT30DjrPg/exec";

    const form = e.target;

    const data = {
        serviceType: document.querySelector("#form-title").innerText.includes("المحاسبة") ? "accounting" : "financial",
        fullName: form.fullName.value,
        phone: form.phone.value,
        email: form.email.value,
        projectName: form.projectName.value,
        helpDate: form.helpDate.value,
        paymentMethod: form.paymentMethod.value,
        serviceDetails: form.serviceDetails.value,
        budget: form.budget.value,
        files: []
    };

    // معالجة الملفات
    const files = document.getElementById("file-input").files;

    for (let file of files) {
        const base64 = await toBase64(file);
        data.files.push({
            name: file.name,
            type: file.type,
            base64: base64.replace(/^data:.*;base64,/, "")
        });
    }

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(result => {
        alert("✔ تم إرسال الطلب بنجاح!");
    })
    .catch(err => {
        alert("⚠ فشل الاتصال، تأكدي من السكربت.");
        console.error(err);
    });
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
</script>
